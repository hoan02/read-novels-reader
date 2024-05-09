import { Suspense } from "react";
import { Button, LinearProgress } from "@mui/material";
import Link from "next/link";

import Error from "@/components/layouts/Error";
import { getUserInfo } from "@/lib/data/user.data";
import { UserType } from "@/types/types";
import formatDate from "@/utils/formatDate";

const UpdateAccountComponent = async () => {
  const {
    data: user,
    message,
    status,
  }: { data: UserType; message: string; status: number } = await getUserInfo();
  if (status === 200) {
    return (
      <div>
        {user.publicMetadata.premium && user.publicMetadata.premium.state ? (
          <div>
            <p>Tài khoản của bạn đã được nâng cấp lên Premium</p>
            <div>
              <p>
                Ngày nâng cấp:{" "}
                {user.publicMetadata.premium.startDate && formatDate(user.publicMetadata.premium.startDate)}
              </p>
              <p>
                Ngày hết hạn:{" "}
                {user.publicMetadata.premium.endDate && formatDate(user.publicMetadata.premium.endDate)}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <p className="my-4">Tài khoản chưa được nâng cấp lên Premium</p>
            <Link href={`/premium`}>
              <Button variant="contained">Nâng cấp ngay</Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
  return <Error message={message} status={status} />;
};

const UpdateAccountPage = () => {
  return (
    <div>
      <Suspense fallback={<LinearProgress />}>
        <UpdateAccountComponent />
      </Suspense>
    </div>
  );
};

export default UpdateAccountPage;

export const dynamic = "force-dynamic";
