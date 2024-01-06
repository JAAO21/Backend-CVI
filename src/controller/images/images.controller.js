const AWS = require("aws-sdk");
const MessageError = require('../../messages/messageError.js');
const ImageModel = require('../../models/image.models.js')

const sapcesEndpoint = new AWS.Endpoint(process.env.ENDPOINT);
const s3 = new AWS.S3({
    endpoint: sapcesEndpoint
})
const Upload = async (req, res) => {

    const { file } = req.files;
    try {
        await s3.putObject({
            ACL: 'public-read',
            Bucket: process.env.BUCKET_NAME,
            Body: file.data,
            Key: req.body.fileName + ".pdf"
        }).promise();

        const urlImage = `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT}/${req.body.fileName.name}.pdf`;

        const createImage = new ImageModel({
            title: req.body.fileName + '.pdf',
            key: req.body.fileName + ".pdf",
            url: urlImage
        })

        await createImage.save()

        return res.json({
            message: 'recived file',
            image: createImage
        })
    } catch (error) {
        MessageError(res, error, 500)
    }
};
const AllImages = async (req, res) => {
    try {
        const find = await ImageModel.find();
        find ?
            res.json({ find })
            : MessgaError(res, 'Images all not found', 500)
    } catch (error) { MessageError(res, error, 500) }
};
const FindImagesID = async (req, res) => {
    if (!req.params.id) MessageError(res, "Content cannote id empyt", 400);
    try {
        const find = await ImageModel.find({ _id: req.params.id });
        find ?
            res.json({ find })
            : MessgaError(res, 'Images all not found', 500)
    } catch (error) { MessageError(res, error, 500) }
};

const FindImagesKey = async (req, res, next) => {
    const { key } = req.query;
    if (key) console.log('atribute key is empyt')
    try {
        const find = await ImageModel.find({ key: key });
        find ?
            res.json({ find })
            : MessgaError(res, 'Image not found', 500)
    } catch (error) { console.log(error) }

};

const DeleteImagesID = async (req, res) => {
    if (!req.params.id) MessageError(res, "Content cannote id empyt", 400);
    try {
        const deleteImage = await ImageModel.findByIdAndDelete({ _id: req.params.id });
        if (deleteImage) {
            await s3.deleteObject({
                Bucket: process.env.BUCKET_NAME,
                Key: deleteImage.key
            }).promise();
            res.json({ message: 'Image eliminated', info: deleteImage })
        }

    } catch (error) { MessageError(res, error, 500) }
};

const UploadImages = async (req, res) => {
    console.log('hello')
    try {
        const createImage = new ImageModel({
            title: req.body.title,
            key: req.body.title,
            url: req.body.url
        })

        await createImage.save()

        return res.json({
            message: 'recived image',
            image: createImage,
            status: true,
        })
    } catch (error) { MessageError(res, error, 500) }
}

const FindKeyId=async (key)=>{
    const find = await ImageModel.find({ key: key });
    console.log(find);
    return find;
}


module.exports = { Upload, AllImages, DeleteImagesID, FindImagesID, FindImagesKey, UploadImages };