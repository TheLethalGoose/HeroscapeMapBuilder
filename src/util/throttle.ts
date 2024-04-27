export function throttle<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
    let lastCall = 0;
    return (...args: Parameters<T>): void => {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        fn(...args);
    };
}