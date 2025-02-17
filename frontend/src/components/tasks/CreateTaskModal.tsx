import React, { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "../../hooks/useWallet";
import { taskService } from "../../services/task.service";
import { Button } from "../common/button/Button";
import { toast } from "react-toastify";
import { CONTRACT_CONFIG } from "../../config/contract.config";

interface CreateTaskModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const { address } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    priority: 0,
    dueDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.title.trim() || formData.priority < 0 || formData.priority > 5) {
      toast.error("Invalid input: Title is required & priority must be between 0-5.");
      setIsLoading(false);
      return;
    }

    try {
      const waitingToastId = toast.loading("Fetching timestamp...");

      const { timestamp } = await taskService.getTimestamp();
      if (!timestamp) throw new Error("Failed to retrieve timestamp.");

      if (!address) throw new Error("Wallet address not found. Please connect your wallet.");

      const taskHash = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(
          ["string", "address", "uint256"],
          [formData.title, address, timestamp]
        )
      );

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_CONFIG.address, CONTRACT_CONFIG.abi, signer);

      toast.update(waitingToastId, {
        render: "Confirm transaction in wallet...",
        type: "info",
        isLoading: true,
      });

      const tx = await contract.createTask(taskHash);
      await tx.wait();

      await taskService.createTask({
        title: formData.title,
        priority: formData.priority,
        due_date: formData.dueDate ? new Date(formData.dueDate) : undefined,
        task_hash: taskHash,
        user_address: address,
        timestamp,
      });

      toast.dismiss(waitingToastId);
      toast.success("Task created successfully!");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.reason || error.message || "Task creation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Create New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2"
            required
          />

          <input
            type="number"
            min="0"
            max="5"
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: Math.max(0, Math.min(5, Number(e.target.value))) })
            }
            className="w-full px-3 py-2 border rounded-lg focus:ring-2"
          />

          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2"
          />

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" isLoading={isLoading}>
              Create Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
