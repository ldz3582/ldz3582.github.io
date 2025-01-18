// declaraction of document.ready() function.
(function () {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function () {
        for (var i = 0; i < fn.length; i++) fn[i]();
    };
    var d = document;
    d.ready = function (f) {
        if (!ie && !wk && d.addEventListener)
            return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function () {
                try {
                    d.documentElement.doScroll('left');
                    run();
                } catch (err) {
                    setTimeout(arguments.callee, 0);
                }
            })();
        else if (wk)
            var t = setInterval(function () {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t), run();
            }, 0);
    };
})();


document.ready(
    // toggleTheme function.
    // this script shouldn't be changed.
    () => {
        var _Blog = window._Blog || {};
        const currentTheme = window.localStorage && window.localStorage.getItem('theme');
        const isDark = currentTheme === 'dark';
        const pagebody = document.getElementsByTagName('body')[0]
        if (isDark) {
            document.getElementById("switch_default").checked = true;
            // mobile
            document.getElementById("mobile-toggle-theme").innerText = "· Dark"
        } else {
            document.getElementById("switch_default").checked = false;
            // mobile
            document.getElementById("mobile-toggle-theme").innerText = "· Dark"
        }
        _Blog.toggleTheme = function () {
            if (isDark) {
                pagebody.classList.add('dark-theme');
                // mobile
                document.getElementById("mobile-toggle-theme").innerText = "· Dark"
            } else {
                pagebody.classList.remove('dark-theme');
                // mobile
                document.getElementById("mobile-toggle-theme").innerText = "· Light"
            }
            document.getElementsByClassName('toggleBtn')[0].addEventListener('click', () => {
                if (pagebody.classList.contains('dark-theme')) {
                    pagebody.classList.remove('dark-theme');
                } else {
                    pagebody.classList.add('dark-theme');
                }
                window.localStorage &&
                window.localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light',)
            })
            // moblie
            document.getElementById('mobile-toggle-theme').addEventListener('click', () => {
                if (pagebody.classList.contains('dark-theme')) {
                    pagebody.classList.remove('dark-theme');
                    // mobile
                    document.getElementById("mobile-toggle-theme").innerText = "· Light"

                } else {
                    pagebody.classList.add('dark-theme');
                    // mobile
                    document.getElementById("mobile-toggle-theme").innerText = "· Dark"
                }
                window.localStorage &&
                window.localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light',)
            })
        };
        _Blog.toggleTheme();

        // 启动雪花效果
        (function() {
            var flakes = [];
            var numberOfFlakes = 50;

            function createFlake() {
                var flake = document.createElement('div');
                flake.className = 'flake';
                flake.style.position = 'absolute';
                flake.style.top = '-10px';
                flake.style.width = Math.random() * 10 + 'px';
                flake.style.height = flake.style.width;
                flake.style.backgroundColor = 'white';
                flake.style.borderRadius = '50%';
                document.body.appendChild(flake);
                flakes.push(flake);
            }

            function moveFlakes() {
                flakes.forEach(function(flake) {
                    var position = parseFloat(flake.style.top);
                    flake.style.top = position + 1 + 'px';
                    if (position > window.innerHeight) {
                        flake.style.top = '-10px';
                    }
                });
            }

            for (var i = 0; i < numberOfFlakes; i++) {
                createFlake();
            }

            setInterval(moveFlakes, 30);
        })();
    }
);