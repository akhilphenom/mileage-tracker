export const validators = () => {
    return {
        validateName: (name: string) => {
            if(!name || /[^a-zA-Z\s]/.test(name)) {
                return false;
            }
            return true;
        },
        validateEmail: (email: string) => {
            email = email.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailPattern.test(email)) {
                return false
            }
            return true
        }
    }
}