import supabase from "./supabase.js";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if(error) {
        console.error(error);
        throw new Error('Cabins could not be loaded');
    }

    return data;
}

export async function createCabin(newCabin) {
    const hasImagePath = newCabin.image?.startsWith?.("https://vefsgnxzhjndvsfbhvkf.supabase.co/");

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );

    //https://vefsgnxzhjndvsfbhvkf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    const imagePath = hasImagePath
        ? newCabin.image
        : `https://vefsgnxzhjndvsfbhvkf.supabase.co/storage/v1/object/public/cabin-images//${imageName}`;

    // create cabin
    const { data, error } = await supabase
        .from('cabins')
        .insert([
            {...newCabin, image: imagePath}
        ])
        .select()

    if(error) {
        console.error(error);
        throw new Error('Cabins could not be created');
    }

    // upload image
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // delete the cabin IF there was an error uploading image
    if(storageError) {
        await supabase.from('cabins').delete().eq('id', data.id);
        console.error(storageError);
        throw new Error('Cabin image could not be uploaded and the cabin was not created');
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if(error) {
        console.error(error);
        throw new Error('Cabins could not be deleted');
    }

    return data;
}