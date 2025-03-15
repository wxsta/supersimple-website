document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // 创建轮播点
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(n) {
        currentSlide = n;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(currentSlide);
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // 自动轮播
    setInterval(nextSlide, 5000);
    
    // 移动端菜单
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        mobileMenu.classList.toggle('active');
    });

    const uploadArea = document.getElementById('uploadArea');
    const uploadContent = document.getElementById('uploadContent');
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');
    const resultArea = document.getElementById('resultArea');
    const resetBtn = document.getElementById('resetBtn');
    const pestType = document.getElementById('pestType');
    const damageLevel = document.getElementById('damageLevel');
    const suggestion = document.getElementById('suggestion');

    // 点击上传区域触发文件选择
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // 处理拖拽
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // 处理文件选择
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    // 重置按钮
    resetBtn.addEventListener('click', () => {
        uploadContent.style.display = 'block';
        previewImage.style.display = 'none';
        resultArea.style.display = 'none';
        fileInput.value = '';
    });

    // 处理文件上传和识别
    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('请上传图片文件');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('图片大小不能超过5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            uploadContent.style.display = 'none';
            previewImage.style.display = 'block';
            
            // 模拟AI识别过程
            simulateAIRecognition();
        };
        reader.readAsDataURL(file);
    }

    // 模拟AI识别过程
    function simulateAIRecognition() {
        resultArea.style.display = 'none';
        
        // 模拟加载延迟
        setTimeout(() => {
            // 这里是模拟的识别结果，实际项目中需要调用后端API
            const results = {
                pestType: '稻纵卷叶螟',
                damageLevel: '中度危害',
                suggestion: '建议使用生物防治方法：\n1. 释放赤眼蜂\n2. 及时清除病害株\n3. 适当调整灌溉量'
            };

            pestType.textContent = results.pestType;
            damageLevel.textContent = results.damageLevel;
            suggestion.textContent = results.suggestion;

            resultArea.style.display = 'block';
        }, 1500);
    }
}); 