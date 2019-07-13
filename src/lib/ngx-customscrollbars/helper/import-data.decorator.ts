
export function importData<T>(target, key = null, descriptor: PropertyDescriptor): PropertyDescriptor {

    if (!descriptor) {
        descriptor = Object.getOwnPropertyDescriptor(target, key);
    }

    const originalMethod = descriptor.value;
    descriptor.value = function (data: T) {
        // get all properties, exclude decorated property
        Object.keys(data).forEach((property) => {
            this[property] = data[property];
        });
        // call original descriptor
        const result = originalMethod.call(this, data);
        return result;
    };
    return descriptor;
}
