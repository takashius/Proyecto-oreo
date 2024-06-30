const div = document.querySelector('#notification');

export const createNotification = (isError, message) => {
    if (isError) {
        div.innerHTML = 
        `
        <div class="max-w-7xl mx-auto flex p-4">
            <p class="text-white font-bold bg-red-500 p-4 rounded-lg">${message}</p>
        </div>
        `
    } else {
        div.innerHTML = 
        `
                <div class="max-w-7xl mx-auto flex p-4">
                    <p class="text-white font-bold bg-green-500 p-4 rounded-lg">${message}</p>
                </div>
        `
    }    
}
