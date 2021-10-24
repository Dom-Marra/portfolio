import { useState, useEffect, useRef } from 'react';

const useOnScreen = (entries, margin = '0px') => {
    const [intersects, setIntersects] = useState(entries.map(() => false));
    const intersectsRef = useRef(entries.map(() => false));
    const observer = useRef();
    
    const observe = (oEntries, observer) => {
    
        oEntries.forEach(oEntry => {
            const index = entries.findIndex(entry => entry.current === oEntry.target);

            if (oEntry.isIntersecting) { 
                intersectsRef.current[index] = true;
                observer.unobserve(oEntry.target);
            }
        });

        setIntersects([...intersectsRef.current]);
    };

    useEffect(() => {

        observer.current = new IntersectionObserver(observe, {rootMargin: margin});

        entries.forEach(entry => {
            if (entry.current) {
                observer.current.observe(entry.current);
            }
        });

        return () => {
            observer.current.disconnect();
        }
    }, []);

    return intersects;
}

export default useOnScreen;