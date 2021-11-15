import { Request, Response } from "express";
import Photos from "../models/Photos";
import path from 'path';
import fs from 'fs-extra'

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photos.find();
    return res.json(photos)
}

export async function createPhoto(req: Request, res: Response): Promise<Response> {

    const { title, description } = req.body;
    const newPhoto = {
        title: title,
        description: description,
        imagePath: req.file?.path
    }
    const photo = new Photos(newPhoto)

    await photo.save();
    return res.json({
        message: "Photo successfully saved"
    })
}


export async function getPhoto(req: Request, res: Response): Promise<Response> {
    
    const id = req.params.id;
    const img = await Photos.findById(id)
    return res.json(img);    
}


export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const img = await Photos.findByIdAndRemove(id)

    if(img) {
        fs.unlink(path.resolve(img.imagePath))
    }
    return res.json(img); 
}


export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const {title, description} = req.body;
    const newImg = await Photos.findByIdAndUpdate(id, {
        title,
        description
    },
    {new: true})
        
    return res.json({
        message: "Updated",
        newImg
    })
}