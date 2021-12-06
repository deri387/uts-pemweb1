/**
 *
 * Dokumen ketika selesai di load munculkan beberapa event function
 */

document.addEventListener("DOMContentLoaded", function () {
  const storage = localStorage.getItem("auth");
  const protectedRoute = ["home", "product", "contact", "article"];
  const publicRoute = ["index", "register"];
  const findProtectedRoute = protectedRoute.find(
    (e) => window.location.pathname.indexOf(e) > -1
  );
  const findPublicRoute = publicRoute.find(
    (e) => window.location.pathname.indexOf(e) > -1
  );

  if (storage) {
    const parsingJSON = JSON.parse(storage);
    if (findPublicRoute) {
      if (!parsingJSON.isLogin) {
        console.log("Not Authenticated");
      } else {
        window.location.href = "home.html";
      }
    } else {
      if (!parsingJSON.isLogin) {
        window.location.href = "index.html";
      }
    }
  } else {
    if (findProtectedRoute) {
      window.location.href = "index.html";
    }
  }
});
/**
 *
 * Mendapatkan data penyimpanan sementara
 */
function getStorage(name) {
  const storage = localStorage.getItem(name);
  if (storage) {
    return JSON.parse(storage);
  }
  return null;
}
/**
 *
 * Fungsi untuk membuat alert bootstrap dinamis
 * danger, success, warning
 */
function showMessage(el, message, type) {
  el.innerHTML = "";
  var wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div class="fs-12 alert alert-' +
    type +
    ' alert-dismissible" role="alert">' +
    message +
    '<button type="button" class="btn-close fs-12" data-bs-dismiss="alert" aria-label="Close"></button></div>';

  el.append(wrapper);
}
/**
 *
 * Fungsi untuk melakukan daftar akun dan akan disimpan dalam penyimpanan sementara
 * localStorage.setItem("name", value)
 */
function register() {
  const error = document.getElementById("error");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  if (name === "" || email === "" || password === "" || password2 === "") {
    return showMessage(
      error,
      "Harap isi data form dengan baik dan benar.",
      "danger"
    );
  }

  if (password !== password2) {
    return showMessage(
      error,
      "Password dan konfirmasi password tidak sama.",
      "danger"
    );
  }

  localStorage.setItem(
    "auth",
    JSON.stringify({
      name: name,
      email: email,
      password: password,
      isLogin: false,
    })
  );

  window.location.href = "index.html";
}

/**
 *
 * Fungsi untuk melakukan login akun dan akan memvalidasi dalam penyimpanan sementara
 * localStorage.getItem("name", value)
 */
function login() {
  const error = document.getElementById("error");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const storage = localStorage.getItem("auth");

  if (!storage) {
    return showMessage(
      error,
      "Gagal melakukan login, silahkan daftar.",
      "danger"
    );
  }
  if (email === "" || password === "") {
    return showMessage(
      error,
      "Harap isi data form dengan baik dan benar.",
      "danger"
    );
  }

  const parsingJSON = JSON.parse(storage);
  if (password !== parsingJSON.password) {
    return showMessage(error, "Password kurang tepat.", "danger");
  }

  parsingJSON.isLogin = true;
  localStorage.setItem("auth", JSON.stringify(parsingJSON));
  window.location.href = "home.html";
}

/**
 *
 * Fungsi logout
 */
function logout() {
  const storage = getStorage("auth");
  if (storage) {
    storage.isLogin = false;
    localStorage.setItem("auth", JSON.stringify(storage));
    window.location.reload(true);
  }
}

/**
 *
 * Fungsi checkout
 */
function checkout(value) {
  window.location.href = "checkout.html?value=" + value;
}
