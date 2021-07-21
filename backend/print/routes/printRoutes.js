import express from 'express';
import { printAll_C, printBill_C, printFinalBill_C, printKitchen_C, printSplitBill_C, printVoid_C, saveTaxFile } from '../controllers/printControllers.js';

const router = express.Router()

router.post('/bill',printBill_C);//create new order with id if qr code is accessed(Redirect to Landing page with session id in params)

router.post('/finalbill',printFinalBill_C)

router.post('/kitchen',printKitchen_C)

router.post('/splitbill',printSplitBill_C)

router.post('/all',printAll_C)

router.post('/voidItem',printVoid_C)

router.post('/saveTaxFile',saveTaxFile)


export default router