import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchScreening, saveScreening } from "../lib/api";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/screening/$stageId")({
  component: ScreeningPage,
});

function ScreeningPage() {
  const { stageId } = Route.useParams();
  const queryClient = useQueryClient();

  // Form State
  const [note, setNote] = useState("");
  const [decision, setDecision] = useState("");

  // Fetch screening data
  const {
    data: rawData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["screening", stageId],
    queryFn: () => fetchScreening(stageId),
  });

  const data = rawData?.data ?? rawData;

  // Populate form when data loads
  useEffect(() => {
    if (data) {
      setNote(data.note || "");
      setDecision(data.decision || "");
    }
  }, [data]);

  // Save mutation
  const mutation = useMutation({
    mutationFn: (payload: { note: string; decision: string }) =>
      saveScreening(stageId, payload),

    onSuccess: () => {
      // Refresh query after successful save
      queryClient.invalidateQueries({
        queryKey: ["screening", stageId],
      });
    },

    onError: (error) => {
      console.error("Save failed:", error);
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0f1115]">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-4 bg-red-900/20 border border-red-500 rounded-lg flex items-center gap-3 text-red-200">
        <AlertCircle size={20} />
        <p>Failed to load screening data. Is the backend running?</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 min-h-screen">
      {/* FORM SECTION */}
      <div className="bg-[#1a1d23] p-6 rounded-xl border border-gray-800 shadow-xl space-y-6">
        <h1 className="text-xl font-bold text-white">Screening Assessment</h1>

        <div className="space-y-4">
          {/* Decision */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Decision
            </label>

            <select
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className="w-full p-2.5 bg-[#0f1115] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select a decision...</option>

              {/* FIXED VALUES */}
              <option value="pass">Pass</option>
              <option value="reject">Reject</option>
              <option value="hold">Hold</option>
            </select>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Internal Note
            </label>

            <textarea
              className="w-full p-3 bg-[#0f1115] border border-gray-700 rounded-lg min-h-[120px] text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter assessment details..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={() => {
              console.log({ note, decision });

              mutation.mutate({
                note,
                decision,
              });
            }}
            disabled={mutation.isPending || !decision}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-semibold py-2.5 rounded-lg transition-all flex justify-center items-center gap-2"
          >
            {mutation.isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Save Decision"
            )}
          </button>

          {/* Success Message */}
          {mutation.isSuccess && (
            <div className="flex items-center gap-2 text-green-400 text-sm justify-center">
              <CheckCircle2 size={16} />
              Saved to database!
            </div>
          )}

          {/* Error Message */}
          {mutation.isError && (
            <div className="flex items-center gap-2 text-red-400 text-sm justify-center">
              <AlertCircle size={16} />
              Failed to save decision
            </div>
          )}
        </div>
      </div>

      {/* SAVED DATA CARD */}
      {data && (
        <div className="bg-[#1a1d23] p-6 rounded-xl border border-gray-800 shadow-lg space-y-3">
          <h2 className="font-semibold text-blue-400 text-center text-xs uppercase tracking-widest">
            Latest Saved Data
          </h2>

          <div className="grid grid-cols-2 gap-4 text-sm text-center">
            {/* Status */}
            <div>
              <p className="text-gray-500 text-xs">Status</p>

              <p
                className={`capitalize font-bold text-lg ${
                  data.decision === "pass"
                    ? "text-green-400"
                    : data.decision === "reject"
                      ? "text-red-400"
                      : "text-amber-400"
                }`}
              >
                {data.decision || "N/A"}
              </p>
            </div>

            {/* Updated At */}
            <div>
              <p className="text-gray-500 text-xs">Last Updated</p>

              <p className="font-medium text-gray-300">
                {data.updatedAt
                  ? new Date(data.updatedAt).toLocaleString()
                  : "Never"}
              </p>
            </div>

            {/* Note */}
            <div className="col-span-2 border-t border-gray-800 pt-4 mt-2">
              <p className="text-gray-500 text-xs mb-2">Note</p>

              <p className="italic text-gray-300 bg-[#0f1115] p-3 rounded-lg border border-gray-700">
                {data.note || "No notes provided."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
