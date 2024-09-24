const syncVideoWithScroll = (containerSelector, videoSelector) => {
    const container = document.querySelector(containerSelector);
    const video = document.querySelector(videoSelector);
    
    const updateVideoProgress = () => {
        if (video.duration) {
            const containerOffset = window.scrollY + container.getBoundingClientRect().top;
            const scrollableHeight = container.scrollHeight - window.innerHeight;
            const scrolledPercentage = (window.scrollY - containerOffset) / scrollableHeight;
            const percentSrcolled = Math.min(Math.max(scrolledPercentage, 0), 1);

            video.currentTime = video.duration * percentSrcolled;
        }
        requestAnimationFrame(updateVideoProgress);
    }

    requestAnimationFrame(updateVideoProgress);
}

const extendScrollableHeight = (containerSelector) => {
    const targetElement = document.querySelector(containerSelector);

    targetElement.style.height = `${targetElement.scrollHeight * 3.5}px`;
}

extendScrollableHeight("#container");
syncVideoWithScroll("#container", "#container video");
