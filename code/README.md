# Overview
## Xây dựng hệ thống giám sát hành trình cho phương tiện giao thông sử dụng ESP32 và GPS_NEO_M6_V2.(này viết lâu rồi nên lười sửa lại)
## Với một số tính năng sau: 
  - Chức năng giám sát phương tiện theo thời gian thực với độ trễ nhỏ.
  - Xem lại hành trình xe đã di chuyển qua các mốc thời gian cụ thể.
  - Nút cảnh báo khẩn cấp(ecall) có chức năng giúp tài xế cảnh báo khẩn cấp khi gặp sự cố trên đường về trung tâm 
  - Tất cả được quản lý thông qua webapp với giao diện trực quan dễ sử dụng 
  - Xây dựng mô hình dựa trên cơ sở dữ liệu thời gian thực Firebase. 
## Hướng phát triển. 
  - Kết hợp thêm với modul sim800l để hệ thống được hoàn thiện hơn.
  - Hiện tại mới quản lý được một phương tiện duy nhất, cải tiển để có thể quản lý được nhiều phương tiện hơn.
  - Sự dụng thêm cảm biến [ gia tốc mpu6050](https://hshop.vn/products/cam-bien-6-dof-bac-tu-do-gy-521-mpu6050) để chức năng ecll được hoàn hiện hơn.(đã thêm)
## Một số hình ảnh 
`Giao diện giám sát`

![image](https://user-images.githubusercontent.com/53778428/114484648-cf97da00-9c34-11eb-865e-9bfcf98ff680.png)

`Xem lộ trình xe đã chạy`

![image](https://user-images.githubusercontent.com/53778428/114484971-4fbe3f80-9c35-11eb-9019-fb3e739e42ef.png)

`Chức năng ecall`

![image](https://user-images.githubusercontent.com/53778428/114485240-c78c6a00-9c35-11eb-9719-604b7a00870e.png)

`Có thể xem chi tiết các phương tiện bấm ecall tại đây`

![image](https://user-images.githubusercontent.com/53778428/114485802-c27bea80-9c36-11eb-9cfb-a5551c3a8585.png)

[Demo](https://www.youtube.com/watch?v=wczg0Y3QzBE)

## Contributors
 - Tạ Văn Minh [Facebook](https://www.facebook.com/taminh1310) [Email](taminh39@gmail.com)



  
