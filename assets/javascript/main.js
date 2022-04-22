const $ = document;

$.addEventListener("DOMContentLoaded", () => {
  console.log("salut");

  $.querySelector("#contactform").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = {
      firstname: $.querySelector("#firstname").value,
      lastname: $.querySelector("#lastname").value,
      email: $.querySelector("#email").value,
      subject: $.querySelector("#subject").value,
      message: $.querySelector("#message").value,
    };
    console.log("data worked!");
    const response = await axios.post(" http://localhost:3000/form", data);
    console.log(response);
  });
});
