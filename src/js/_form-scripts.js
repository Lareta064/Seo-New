document.addEventListener("DOMContentLoaded", () => {
    const formItems = document.querySelectorAll(".form-item");

    if (formItems.length > 0) {
        for (let item of formItems) {
            const itemInput = item.querySelector(".form-input");
            const itemStateIcon = item.querySelector(".form-input-state");

            // Событие потери фокуса для проверки валидности
            itemInput.addEventListener("blur", () => {
                const value = itemInput.value.trim();
				// const isValidPhone = /^[0-9]{10}$/.test(value); 
                // Пример проверки: валидное поле не пустое
                if (value !== "") {
                    item.classList.remove("error");
                    itemStateIcon.classList.add("active");
                } else {
                    item.classList.add("error");
                    itemStateIcon.classList.remove("active");
                }
            });

            // Очистка поля по клику на иконку
            itemStateIcon.addEventListener("click", () => {
                if (item.classList.contains("error") && itemStateIcon.classList.contains("active")) {
                    itemInput.value = "";
                    item.classList.remove("error");
                    itemStateIcon.classList.remove("active");
                }
            });
        }
    }
	//SWOW SUCCESS MESSAGE
	const modalFrames = document.querySelectorAll(".modal-frame-content");

	modalFrames.forEach((modalFrame) => {
		
		const formBlock = modalFrame.querySelector(".modal-frame-form");
		const successBlock = modalFrame.querySelector(".modal-success");
		const submitButton = formBlock?.querySelector("[type='submit']");

		if (submitButton) {
			submitButton.addEventListener("click", (event) => {
				event.preventDefault(); // Отключаем стандартное поведение кнопки submit
				
				if (successBlock) {
					successBlock.classList.add("show-block");
				}
				if (formBlock) {
					formBlock.classList.add("hide-block");
				}
			});
		}
	});
    const fileInputs = document.querySelectorAll(".fileUploadInput");

    fileInputs.forEach((input) => {
        input.addEventListener("change", (event) => {
            const label = input.closest(".fileUpload-label");
            const labelTxt = label.querySelector(".fileUpload-name");
            const stateCheck = label.querySelector(".form-input-state");
            const fileName = input.files[0]?.name || "Добавить файл"; // Название файла или текст по умолчанию

            labelTxt.textContent = fileName; // Обновляем текст в span.fileUpload-name
            if (input.files.length > 0) {
                stateIcon.classList.add("active"); // Файл выбран
                label.classList.add("label-change");
            } else {
                stateIcon.classList.remove("active"); // Файл удален
                label.classList.add("remove-change");
            }
        });
    });
});