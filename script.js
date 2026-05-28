document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('profileForm');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Page reload rokna

            // Elements target karna
            const nameInput = document.getElementById('studentName');
            const rollInput = document.getElementById('rollNumber');
            const courseInput = document.getElementById('course');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const imageInput = document.getElementById('imageUpload');
            const aboutInput = document.getElementById('about');

            let isValid = true;

            // 1. Normal Text Inputs Validation Function
            function checkInput(inputElement, errorId) {
                const errorSpan = document.getElementById(errorId);
                if (inputElement.value.trim() === "") {
                    errorSpan.style.display = "block";
                    inputElement.classList.add("invalid-input");
                    isValid = false;
                } else {
                    errorSpan.style.display = "none";
                    inputElement.classList.remove("invalid-input");
                }
            }

            // Baki saare text fields check karein
            checkInput(nameInput, 'nameError');
            checkInput(rollInput, 'rollError');
            checkInput(courseInput, 'courseError');
            checkInput(aboutInput, 'aboutError');

            // 2. STRICT EMAIL VALIDATION (With @ and .com mandatory check)
            const emailError = document.getElementById('emailError');
            const emailValue = emailInput.value.trim();
            
            // Regular Expression: Yeh check karta hai ki alphanumeric characters/dots ke baad @ aaye, fir domain name ho, aur aakhir me strictly .com ho.
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

            if (!emailPattern.test(emailValue)) {
                emailError.style.display = "block";
                emailInput.classList.add("invalid-input");
                isValid = false;
            } else {
                emailError.style.display = "none";
                emailInput.classList.remove("invalid-input");
            }

            // 3. PROPER PHONE NUMBER VALIDATION (Exact 10 Digits Only)
            const phoneError = document.getElementById('phoneError');
            const phoneValue = phoneInput.value.trim();
            const phonePattern = /^[0-9]{10}$/;

            if (!phonePattern.test(phoneValue)) {
                phoneError.style.display = "block";
                phoneInput.classList.add("invalid-input");
                isValid = false;
            } else {
                phoneError.style.display = "none";
                phoneInput.classList.remove("invalid-input");
            }

            // 4. Image Input Validation
            const imageError = document.getElementById('imageError');
            if (imageInput.files.length === 0) {
                imageError.style.display = "block";
                imageInput.classList.add("invalid-input");
                isValid = false;
            } else {
                imageError.style.display = "none";
                imageInput.classList.remove("invalid-input");
            }

            // 5. Skills Checkbox Validation
            const checkedSkills = [];
            const skillBoxes = document.querySelectorAll('input[name="skills"]:checked');
            skillBoxes.forEach(box => {
                checkedSkills.push(box.value);
            });

            const skillsError = document.getElementById('skillsError');
            if (checkedSkills.length === 0) {
                skillsError.style.display = "block";
                isValid = false;
            } else {
                skillsError.style.display = "none";
            }

            // Agar koi bhi validation fail hui toh card block karein
            if (!isValid) {
                return; 
            }

            // Gender nikalna
            const genderOption = document.querySelector('input[name="gender"]:checked');
            const gender = genderOption ? genderOption.value : '-';

            // Card me data display karwana
            document.getElementById('cardName').textContent = nameInput.value;
            document.getElementById('cardEmail').textContent = emailInput.value;
            document.getElementById('cardRoll').textContent = rollInput.value;
            document.getElementById('cardCourse').textContent = courseInput.value;
            document.getElementById('cardPhone').textContent = phoneInput.value;
            document.getElementById('cardGender').textContent = gender;
            document.getElementById('cardSkills').textContent = checkedSkills.join(', ');
            document.getElementById('cardAbout').textContent = aboutInput.value;

            // Image load karke card par lagana
            if (imageInput.files && imageInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('cardImage').src = e.target.result;
                };
                reader.readAsDataURL(imageInput.files[0]);
            }
        });

        // Typing karte hi error hatane ke liye listeners:
        const textInputs = ['studentName', 'rollNumber', 'course', 'email', 'phone', 'about'];
        textInputs.forEach(id => {
            document.getElementById(id).addEventListener('input', function() {
                this.classList.remove('invalid-input');
                const errorId = id === 'studentName' ? 'nameError' : 
                                id === 'rollNumber' ? 'rollError' : 
                                id === 'course' ? 'courseError' : 
                                id === 'email' ? 'emailError' : 
                                id === 'phone' ? 'phoneError' : 'aboutError';
                document.getElementById(errorId).style.display = 'none';
            });
        });

        // User ko phone field me number ke alawa kuch aur type hi na karne dein
        document.getElementById('phone').addEventListener('keypress', function(event) {
            if (event.which < 48 || event.which > 57) {
                event.preventDefault();
            }
        });

        // Image file select karte hi error message hatayein
        document.getElementById('imageUpload').addEventListener('change', function() {
            if (this.files.length > 0) {
                this.classList.remove('invalid-input');
                document.getElementById('imageError').style.display = 'none';
            }
        });

        // Checkbox select karte hi error hatayein
        const skillCheckboxes = document.querySelectorAll('input[name="skills"]');
        skillCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const anyChecked = document.querySelectorAll('input[name="skills"]:checked').length > 0;
                if (anyChecked) {
                    document.getElementById('skillsError').style.display = 'none';
                }
            });
        });
    }
});