// UI Helper Functions
function showToast(message, type = 'success') {
    let toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function showLoading(show = true) {
    let loader = document.getElementById('loader');
    if(!loader) {
        loader = document.createElement('div');
        loader.id = 'loader';
        loader.className = 'loading';
        document.body.appendChild(loader);
    }
    
    loader.style.display = show ? 'block' : 'none';
}

function confirmAction(message) {
    return confirm(message);
}

// Add toast styles
const style = document.createElement('style');
style.textContent = `
    .toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 2000;
    }
    .toast.show { opacity: 1; }
    .toast.success { background: #4CAF50; }
    .toast.error { background: #f44336; }
`;
document.head.appendChild(style);