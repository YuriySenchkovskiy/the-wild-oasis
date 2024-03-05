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

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.("https://vefsgnxzhjndvsfbhvkf.supabase.co/");

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );

    const imagePath = hasImagePath
        ? newCabin.image
        : `https://vefsgnxzhjndvsfbhvkf.supabase.co/storage/v1/object/public/cabin-images//${imageName}`;

    // create cabin
    let query = supabase.from("cabins");

    // create
    if(!id) query = query.insert([{...newCabin, image: imagePath}]);

    // edit
    if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id).select();

    const { data, error } = await query.select().single();

    if(error) {
        console.error(error);
        throw new Error('Cabins could not be created');
    }

    // upload image
    if(hasImagePath) return data;
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