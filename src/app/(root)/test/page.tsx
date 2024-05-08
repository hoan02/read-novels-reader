import AvatarFrame from "@/components/custom-ui/AvatarFrame";
import { getSessions } from "@/utils/getSession";

const page = async () => {
  const { avatar, role, fullName } = getSessions();
  console.log(role);
  return (
    <div className="bg-white h-40 flex justify-center items-center">
      {avatar && <AvatarFrame src={avatar} />}
      <div>{fullName}</div>
    </div>
  );
};

export default page;
