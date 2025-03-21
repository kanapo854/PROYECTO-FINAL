import Swal from "sweetalert2";
const showAlert = (icon, mensaje, color_ic) => {
    Swal.fire({
      toast: true,
      icon: icon,
      iconColor: color_ic,
      text: mensaje,
      position: "top-end",
      showConfirmButton: false,
      timer: 2100,
      background: "",
      color: color_ic,
      padding: "20px"
    });
};

export default showAlert;