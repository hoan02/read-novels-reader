"use client";

import { Trophy } from "lucide-react";
import { Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { checkNomination } from "@/lib/data/nomination.data";
import {
  createNomination,
  deleteNomination,
} from "@/lib/actions/nomination.action";
import toast from "react-hot-toast";

const NominationButton = ({ novelSlug }: { novelSlug: string }) => {
  const queryClient = useQueryClient();
  const { data: nominationState, isLoading } = useQuery({
    queryKey: ["nomination", novelSlug],
    queryFn: async () => {
      return await checkNomination(novelSlug);
    },
    enabled: !!novelSlug,
  });

  const handleClickNomination = useMutation({
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
      onClick={() => handleClickNomination.mutate()}
    >
      {nominationState ? "Đã đề cử" : "Đề cử"}
    </Button>
  );
};

export default NominationButton;
