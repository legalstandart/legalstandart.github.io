document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Открыть меню");
    });
  });
}

const locationContent = {
  office: {
    type: "КЛИЕНТСКИЙ ОФИС",
    title: "Санкт-Петербург",
    description: "Приём по предварительной договорённости. Адрес офиса уточняется.",
    caption: "САНКТ-ПЕТЕРБУРГ · АДРЕС УТОЧНЯЕТСЯ"
  },
  mail: {
    type: "КОРРЕСПОНДЕНЦИЯ",
    title: "Почтовый адрес",
    description: "Адрес для отправки документов будет опубликован после подтверждения реквизитов.",
    caption: "ПОЧТОВЫЙ АДРЕС · УТОЧНЯЕТСЯ"
  }
};

document.querySelectorAll("[data-location-button]").forEach((button) => {
  button.addEventListener("click", () => {
    const content = locationContent[button.dataset.locationButton];
    document.querySelector("[data-location-type]").textContent = content.type;
    document.querySelector("[data-location-title]").textContent = content.title;
    document.querySelector("[data-location-description]").textContent = content.description;
    document.querySelector("[data-map-caption]").textContent = content.caption;

    document.querySelectorAll("[data-location-button]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
  });
});

document.querySelectorAll('input[type="file"]').forEach((input) => {
  input.addEventListener("change", () => {
    const label = input.closest("label").querySelector(".file-name");
    label.textContent = input.files.length ? input.files[0].name : "Файл не выбран";
  });
});

// Publish only after the agency supplies a verified recipient address.
const recipientEmail = "";

document.querySelectorAll("[data-mail-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!recipientEmail) {
      window.alert("Отправка пока недоступна: контактный email агентства не подтверждён.");
      return;
    }

    const fields = new FormData(form);
    const subject = `Обращение с сайта ПравоСтандарт: ${document.title}`;
    const body = [
      `Имя: ${fields.get("name")}`,
      `Телефон: ${fields.get("phone")}`,
      `Email: ${fields.get("email")}`,
      "",
      `Вопрос: ${fields.get("question")}`,
      "",
      fields.get("file").name
        ? `Добавьте файл к письму вручную: ${fields.get("file").name}`
        : "Файл не выбран"
    ].join("\n");

    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});