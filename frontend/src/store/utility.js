export const updateObject = (old, updatedProperties) => {
    return {
        ...old,
        ...updatedProperties
    }
}