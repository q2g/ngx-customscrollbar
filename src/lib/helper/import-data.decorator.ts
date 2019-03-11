
export function importData<T>(target, key = null, descriptor: PropertyDescriptor): PropertyDescriptor {

    if (!descriptor) {
        descriptor = Object.getOwnPropertyDescriptor(target, key);
    }

    const originalMethod = descriptor.value;
    descriptor.value = function (data: T) {
        // get all properties, exclude decorated property
        const properties = Object.keys(target).filter((prop) => prop !== key);
        properties.forEach((property) => {
            if (data.hasOwnProperty(property)) {
                this[property] = data[property];
            }
        });
        // call original descriptor
        const result = originalMethod.call(this, data);
        return result;
    };
    return descriptor;
}
