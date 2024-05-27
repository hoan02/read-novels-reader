"use client";

import { Trophy } from "lucide-react";
import { Button } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { checkNomination } from "@/lib/data/nomination.data";
import {
  createNomination,
  deleteNomination,
} from "@/lib/actions/nomination.action";

const NominationButton = ({ novelSlug }: { novelSlug: string }) => {
  const { isSignedIn } = useUser();
  const queryClient = useQueryClient();
  const { data: nominationState, isLoading } = useQuery({
    queryKey: ["nomination", novelSlug],
    queryFn: async () => {
      return await checkNomination(novelSlug);
    },
    enabled: !!novelSlug,
  });

  const nominationMutation = useMutation({
    mutationFn: () => {
      if (nominationState) {
        return deleteNomination(novelSlug);
      } else {
        return createNomination(novelSlug);
      }
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["nomination"] });
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });

  const handleClickNomination = () => {
    if (!isSignedIn) {
      toast.error("Bạn cần đăng nhập thể thực hiện chức năng này!");
      return;
    }
    nominationMutation.mutate();
  };

  return (
    <Button
      variant={nominationState ? "contained" : "outlined"}
      size="large"
      style={{
        borderRadius: "30px",
        textTransform: "none",
      }}
      className="w-full lg:w-[168px]"
      startIcon={<Trophy size={24} />}
      onClick={handleClickNomination}
    >
      {nominationState ? "Đã đề cử" : "Đề cử"}
    </Button>
  );
};

export default NominationButton;
