document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const eventImageInput = document.getElementById("eventImage");
  const previewContainer = document.getElementById("imagePreview");

  let imageBase64 = "";

  // Preview the image
  eventImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        imageBase64 = evt.target.result;
        previewContainer.innerHTML = `<img src="${imageBase64}" alt="Preview" class="img-fluid rounded" style="max-height: 300px;" />`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get values
    const eventName = document.getElementById("eventName").value.trim();
    const description = document.getElementById("description").value.trim();
    const organizer = document.getElementById("organizer").value.trim();
    const location = document.getElementById("location").value.trim();
    const guest = document.getElementById("guest").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const ageLimit = document.getElementById("ageLimit").value;
    const fee = document.getElementById("fee").value;

    // Basic validation
    if (!eventName || !description || !organizer || !location || !date || !time || !imageBase64) {
      alert("Please fill all required fields and upload an image.");
      return;
    }

    const newEvent = {
      eventName,
      description,
      organizer,
      location,
      guest,
      date,
      time,
      ageLimit,
      fee,
      image: imageBase64,
      createdAt: new Date().toISOString()
    };

    // Store in localStorage
    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
    existingEvents.push(newEvent);
    localStorage.setItem("events", JSON.stringify(existingEvents));

    alert("Event added successfully!");
    form.reset();
    previewContainer.innerHTML = "";
    imageBase64 = "";
  });
});
