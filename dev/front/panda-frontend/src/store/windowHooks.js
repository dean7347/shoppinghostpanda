import create from "zustand";

export const useWindowStore = create(set => ({
    loading: false,
    error: '',
    setLoading: (loading) => {
        set({loading: loading})
    },
    setError: (error) => {
        set({error: error})
    }
}))

