type EnterLeaveIOOptions = {
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterOnce?: () => void;
}

const listenerCallbacks = new WeakMap();
const enteredMap = new WeakMap();

let intersectionObserver: IntersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const entered = enteredMap.get(entry.target);
        const { onEnter, onLeave, onEnterOnce } = listenerCallbacks.get(entry.target);

        if(entry.isIntersecting) {
            if(onEnter) {
                onEnter();
            }

            if(!entered && onEnterOnce) {
                onEnterOnce();
                enteredMap.set(entry.target, true);
            }
        } else {
            if(onLeave) {
                onLeave();
            }
        }
    });
})

export function observeElement(element: HTMLElement, options: EnterLeaveIOOptions) {
    listenerCallbacks.set(element, options);
    intersectionObserver.observe(element);
}

export function unobserveElement(element: HTMLElement) {
    intersectionObserver.unobserve(element);
}

export function destroyObserver() {
    intersectionObserver.disconnect();
}