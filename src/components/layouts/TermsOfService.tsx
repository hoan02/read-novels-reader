const TermsOfService = () => {
  return (
    <div className="p-4 rounded-lg">
      <div>
        <div className="text-lg font-bold">Điều Khoản Dịch Vụ</div>
        <div className="text-sm">16:44 - 05/01/2024</div>
      </div>
      <div className="mt-4" id="topic-detail">
        <div>
          <div>
            Khi tham gia sử dụng dịch vụ cung cấp bởi
            <span className="font-bold"> Đọc truyện online</span>, bạn phải đồng
            ý và tuân thủ các quy định sau.
          </div>
          <div className="mt-4">
            Quy định này áp dụng cho mọi đối tượng tham gia hoạt động tại
            website, không kể là khách, thành viên, tác giả, dịch giả, biên tập
            viên, quản trị viên, admin hay bất cứ thành viên nào khác.
          </div>
          <div className="mt-4">Quy định này gồm 2 bên:</div>
          <ul className="list-disc ml-6">
            <li className="mt-2">
              <span className="font-bold">Đọc truyện online</span> cung cấp dịch
              vụ trên internet.
            </li>
            <li>
              Khách hàng gọi tắt là KH, sử dụng dịch vụ của
              <span className="font-bold"> Đọc truyện online </span>trên
              internet.
            </li>
          </ul>

          <p className="mt-4">Nội dung:</p>
          <ol className="mt-4 ml-6 list-decimal">
            <li>
              Không được có những từ ngữ gay gắt, đả kích, xúc phạm, bêu xấu cá
              nhân và tổ chức trên
              <span className="font-bold"> Đọc truyện online</span>.
            </li>
            <li>
              Không phát tán và truyền bá thông tin bất hợp pháp, lừa gạt, bôi
              nhọ, sỉ nhục, tục tĩu, khiêu dâm, xúc phạm, đe dọa, lăng mạ, thù
              hận, kích động… hoặc trái với chuẩn mực đạo đức chung của xã hội.
            </li>
            <li>
              Không được gửi hoặc truyền bất kỳ thông tin hoặc phần mềm nào có
              chứa bất kỳ loại virus, trojan, bọ hay các thành phần nguy hại nào
              đến sự an toàn của hệ thống dịch vụ.
            </li>
            <li>Không được dẫn link hoặc nhắc đến website khác.</li>
            <li>
              Không spam tin nhắn, bình luận, bài viết hay bất cứ hình thức nào
              tại <span className="font-bold"> Đọc truyện online</span>.
            </li>
            <li>Đánh giá và bình luận phải sử dụng tiếng việt có dấu.</li>
            <li>
              Đánh giá hoặc bình luận không liên quan tới truyện sẽ bị xóa.
            </li>
            <li>
              Đánh giá khen/chê truyện một cách chung chung không mang lại giá
              trị cho người đọc sẽ bị xóa.
            </li>
            <li>Đánh giá có điểm số sai lệch với nội dung sẽ bị xóa.</li>
            <li>
              Không để avatar tục tĩu, vi phạm pháp luật hoặc ảnh hưởng đến
              người khác.
            </li>
            <li>
              Không tận dụng các bugs (lỗi) của chương trình nhằm phá hoại sự ổn
              định của <span className="font-bold"> Đọc truyện online</span>.
            </li>
            <li>
              Sẽ khóa vĩnh viễn các tài khoản copy truyện thu phí ra ngoài mà
              không được sự cho phép bằng văn bản của{" "}
              <span className="font-bold"> Đọc truyện online</span>.
            </li>
            <li>
              Quy định về mức phạt đối với thành viên vi phạm nội quy là do ban
              quản trị website tự đề ra.
            </li>
            <li>Thành viên vi phạm sẽ bị khóa nick mà không cần báo trước.</li>
            <li>
              Nhân viên quản lý có quyền xóa nội dung gây hại cho website mà
              không cần báo trước.
            </li>
            <li>
              Nội dung các quy định trên có thể thay đổi mà không cần báo trước.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
