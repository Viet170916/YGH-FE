import React, { JSX } from "react";
import "./Policy.scss";
import NavigatorBar from "../../Components/App/NavigatorBar";

interface IProps { }
function Policy(props: IProps): JSX.Element {
    return (
        <>
            <NavigatorBar />
            <div className="policy">
                <div className="policy__content"><h2>Chính sách bảo mật của YGH</h2>
                    <strong>1.Điều Khoản Dịch Vụ (ToS):</strong>
                    <br />
                    Mô tả rõ ràng các điều khoản và điều kiện dưới đây mà người dùng có thể truy cập và sử dụng trang web của bạn.
                    Xác định các tiêu chuẩn về điều kiện sử dụng, chẳng hạn như tuổi tác hoặc khả năng pháp lý.
                    Giải thích trách nhiệm và nghĩa vụ của cả chủ sở hữu bất động sản và người thuê khi sử dụng nền tảng của bạn.
                    <br />
                    <strong>2.Chính Sách Bảo Mật:</strong>
                    <br />
                    Mô tả cách bạn thu thập, lưu trữ và sử dụng thông tin cá nhân và dữ liệu, bao gồm thông tin thanh toán.
                    Giải thích chính sách của bạn về bảo mật dữ liệu, bảo vệ và quyền riêng tư của người dùng.
                    Cung cấp thông tin về cách người dùng có thể yêu cầu và quản lý dữ liệu cá nhân của họ.
                    <br />
                    <strong>3.Chính Sách Đăng Tin và Cho Thuê:</strong>
                    <br />
                    Mô tả cách chủ sở hữu bất động sản có thể tạo tin đăng, bao gồm hình ảnh, mô tả và chi tiết về giá cả.
                    Giải thích quy trình đặt và thuê nhà thông qua trang web của bạn.
                    Trình bày bất kỳ khoản phí, hoa hồng hoặc chi phí nào liên quan đến việc sử dụng dịch vụ của bạn.
                    <br />
                    <strong>4.Chính Sách Hủy Đặt Và Hoàn Tiền:</strong>
                    <br />
                    Xác định rõ ràng chính sách của bạn về việc hủy đặt của cả chủ sở hữu bất động sản và người thuê.
                    Giải thích các điều kiện dưới đây mà hoàn tiền có thể được thực hiện và thời gian cho các khoản hoàn tiền đó.
                    <br />
                    <strong>5.Chính Sách Hành Vi Của Khách:</strong>
                    <br />
                    Đặt kỳ vọng đối với hành vi và trách nhiệm của người thuê trong suốt thời gian lưu trú.
                    Xác định bất kỳ quy định nào liên quan đến tiếng ồn, hút thuốc, hoặc chính sách về thú cưng.
                    Mô tả các hậu quả cho việc vi phạm các chính sách này.
                    <br />
                    <strong>6.Trách Nhiệm của Chủ Sở Hữu Bất Động Sản:</strong>
                    <br />
                    Đề ra các nhiệm vụ của chủ sở hữu bất động sản trong việc duy trì tài sản và giải quyết các vấn đề của người thuê.
                    Giải thích quy trình cho chủ sở hữu bất động sản để giải quyết các tranh chấp và vấn đề với người thuê.
                    <br />
                    <strong>7.Chính Sách Tài Chính và Thanh Toán:</strong>
                    <br />
                    Chi tiết về các phương thức thanh toán được chấp nhận trên nền tảng của bạn và quy trình xử lý các giao dịch.
                    Xác định thời gian của các khoản thanh toán, bao gồm tiền đặt cọc và thanh toán cuối cùng.
                    Giải thích cách bạn xử lý tiền đặt cọc bảo mật và thuế áp dụng.
                    <br />
                    <strong>8.Bảo Hiểm và Trách Nhiệm:</strong>
                    <br />
                    Làm sáng tỏ trách nhiệm về bảo hiểm cho cả chủ sở hữu bất động sản và người thuê.
                    Điều này áp dụng cho trường hợp thiệt hại cho bất động sản hoặc thương tích cá nhân trong suốt thời gian thuê.
                    <br />
                    <strong>9.Hướng Dẫn Về Đánh Giá và Phản Hồi:</strong>
                    <br />
                    Cung cấp hướng dẫn về cách gửi và nhận đánh giá và phản hồi.
                    Mô tả quy trình xử lý đánh giá và phản hồi gian trái hay độc hại.
                    <br />
                    <strong>10.Tuân Thủ Pháp Luật:</strong>
                    <br />
                    Đảm bảo rằng trang web của bạn và người dùng tuân theo các luật, quy định cục bộ, tiểu bang và quốc gia, chẳng hạn như các quy định về thuê nhà và thuế.
                    Khuyến khích người dùng hiểu và tuân theo các quy định cục bộ.
                    <br />
                    <strong>11.Giải Quyết Tranh Chấp:</strong>
                    <br />
                    Điểm danh quy trình để giải quyết các mâu thuẫn giữa chủ sở hữu bất động sản và người thuê.
                    Xác định cách hoà giải hoặc trọng tài sẽ được tiến hành nếu cần thiết.
                    <br />
                    <strong>12.Chấm Dứt và Đình Chỉ:</strong>
                    <br />
                    Giải thích các điều kiện dưới đây mà tài khoản có thể bị đình chỉ hoặc chấm dứt.
                    Mô tả quy trình xử lý khi người dùng bị đình chỉ hoặc chấm dứt tài khoản của họ.
                </div>
            </div>
        </>
    );
}
export default Policy;
