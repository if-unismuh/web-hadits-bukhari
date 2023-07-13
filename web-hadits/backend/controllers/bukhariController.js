
import { Bukhari } from "../models/bukhariModel.js";
import stopword from 'stopword';
import db from "../config/db.js";
import { Tokenizer, Stemmer } from 'sastrawijs';
import { resultVSM } from "../utils/vektorSpaceModel.js";


// fungsi untuk request data berdasarkan query pencarian (Sistem Pencarian Menggunakan VSM)
export const getAllHadits = async (req,res) => {

    // fungsi untuk preprocessing query
    function preprocessText(text) {
        const tokenizer = new Tokenizer();
        const stemmer = new Stemmer();

        // Tokenisasi teks
        const tokens = tokenizer.tokenize(text);

        // Menghapus stopword
        const filteredTokens = stopword.removeStopwords(tokens, stopword.ind);

        // Stemming
        const stemmedTokens = filteredTokens.map(token => stemmer.stem(token));

        // Menggabungkan kata-kata yang telah diproses menjadi satu string
        const processedText = stemmedTokens.join(' ');

        return processedText;  
    }

    const query = preprocessText(req.body.query)

    // fungsi untuk membuat sebuah query sql yang hanya mengambil data yg didalamnya terkandung query
    const searchKeywords = query.split(' ') // Array kata kunci pencarian dari pengguna
    let querySQL = "SELECT * FROM bukhari WHERE";
    
    // Membangun kondisi pencarian dinamis berdasarkan kata kunci yang dimasukkan
    searchKeywords.forEach((keyword, index) => {
      querySQL += ` Label LIKE '%${keyword}%'`;
    
      // Menambahkan operator OR jika bukan kata kunci terakhir
      if (index !== searchKeywords.length - 1) {
        querySQL += " OR";
      }
    });
    
    
    const [data, metadata] = await db.query(querySQL);

    // funtion untuk memasukkan data ke fungsi untuk menghitung VSM nya
    const result = resultVSM(data,query)  
    
    if (data != null) {
        res.status(200).json({
            data :result
        })
        // res.send(data)      
    } else {
        res.status(404).json({msg: "data tidak ditemukan"})      
    }   

}

//  fungsi untuk request hadits berdasarkan kitab
export const getHaditsByKitab = async (req,res) => {
    const data = await Bukhari.findAll({where: {  
        Kitab: req.params.nama_kitab
    }});

    if (data != null) {
        res.status(200).json({
            data
        })
        // res.send(data)      
    } else {
        res.status(404).json({msg: "data tidak ditemukan"})      
    }   
}


// fungsi untuk mengambil nama nama kitab dan jumlah haditsnya
export const getAllKitabName = async (req,res) => {
    console.log('nama kitab')
    const data = await Bukhari.findAll({
        attributes: ['Kitab']
    })

   //fungsi untuk menghapus duplikat objek dan menghitung jumlah hadits dalam kitab

  function removeDuplicateObjects(array, key) {
  const uniqueObjects = [];
  const encounteredKeys = new Map();

  for (const obj of array) {
    const objKey = key ? obj.dataValues[key] : JSON.stringify(obj.dataValues);

    if (!encounteredKeys.has(objKey)) {
      uniqueObjects.push({ name: obj.dataValues.Kitab, jumlah: 1 });
      encounteredKeys.set(objKey, 1);
    } else {
      const index = uniqueObjects.findIndex(item => item.name === obj.dataValues.Kitab);
      const count = uniqueObjects[index].jumlah + 1;
      encounteredKeys.set(objKey, count);
      uniqueObjects[index].jumlah = count;
    }
  }

  return uniqueObjects;
  }

    if (data != null) {
        res.status(200).json({
            data: removeDuplicateObjects(data)
        })
        // res.send(data)      
    } else {
        res.status(404).json({msg: "data tidak ditemukan"})      
    }   
}