import PrintLib from 'node-thermal-printer'
const ThermalPrinter = PrintLib.printer;
const PrinterTypes = PrintLib.types;

function randomString(length) {
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

let kitchenQueue = []
let cashierQueue = []
let barQueue = []
let cashier = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: 'tcp://192.168.0.130',
    width:40,
  });

  let bar = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: 'tcp://192.168.0.130',
    width:40,
  });

  let kitchen = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: 'tcp://192.168.0.130',
    width:40,
  });

  export const queueCashier= (cart,payment_data,type)=>{
    cashierQueue.push({
      'id': randomString(8),
      'type': type,
      'cart':cart,
      "payment_data":payment_data
    })
  }

  
  export const queueKitchen= (cart,type)=>{
    kitchenQueue.push({
      'id': randomString(8),
      'type': type,
      'cart':cart,
    })
  }
  
  export const queueBar= (cart,type)=>{
    barQueue.push({
      'id': randomString(8),
      'type': type,
      'cart':cart,
    })
  }

  export const printFinalBill = async (cart,payment_data)=>{
    let isConnected = await cashier.isPrinterConnected();
    if(!isConnected){
      queueCashier(cart,payment_data,printFinalBill);
  }else{
   cashier.clear();
    const datetime = cart.datetime_data.time_in
    const time_in = datetime.toLocaleTimeString();
    const date_in = datetime.toLocaleDateString();
    const table_no = cart.table;
    const ticketNumber = cart.ticketNumber;
    const width =cashier.getWidth();
    const users = cart.customerusers;
    const nominal=payment_data.nominal.toLocaleString();
    const change=payment_data.change.toLocaleString();
    console.log(width);  
   cashier.alignCenter();
   cashier.bold(true);  
   cashier.println("Bale Lombok");
   cashier.bold(false);  
   cashier.tableCustom([                                      
      { text:date_in, align:"LEFT", width:0.5},
      { text:time_in, align:"RIGHT", width:0.5}
    ]);
   cashier.newLine();  
   cashier.tableCustom([                                      
      { text:`Table: ${table_no}`, align:"LEFT", width:0.4},
      { text:`Ticket No: ${ticketNumber}`, align:"RIGHT", width:0.6}
    ]);
   cashier.alignCenter();
   cashier.drawLine();  
    users.forEach(user =>{
      if(user.fooditems.length >0){
        let name = user.alias_name;
       cashier.alignLeft()
       cashier.print(name);
       cashier.newLine();
        user.fooditems.forEach(fooditem=>{
          let total_price = fooditem.item.unit_price* fooditem.quantity;
          total_price = total_price.toLocaleString();
         cashier.tableCustom([                                      
            { text:`- ${fooditem.quantity} ${fooditem.item.name}`, align:"LEFT", width:0.5},
            { text:`${total_price}`, align:"RIGHT", width:0.5}
          ]);
          if(fooditem.selected_properties){
           cashier.alignLeft();
           cashier.print(` *`)
            const properties = Object.values(fooditem.selected_properties)
            properties.forEach(property => {
             cashier.print(`${property}|`)
            });
           cashier.newLine();
          }
        })
       cashier.drawLine();
      }
    })
    let cart_total = (cart.subtotal + cart.subtotal*0.05 +cart.subtotal*1.05 *0.1).toLocaleString();
    let service = (cart.subtotal*0.05).toLocaleString();
    let PB1 = (cart.subtotal*1.05*0.1).toLocaleString();
   cashier.tableCustom([                                      
      { text:`Service %5`, align:"LEFT", width:0.5},
      { text:`${service}`, align:"RIGHT", width:0.5}
    ]);
   cashier.tableCustom([                                      
      { text:`PB1`, align:"LEFT", width:0.5},
      { text:`${PB1}`, align:"RIGHT", width:0.5}
    ]);
   cashier.tableCustom([                                      
      { text:`Total`, align:"LEFT", width:0.5},
      { text:`${cart_total}`, align:"RIGHT", width:0.5}
    ]);
   cashier.drawLine('=');

   cashier.tableCustom([                                      
      { text:`Payment Type`, align:"LEFT", width:0.5},
      { text:`${payment_data.payment_type}`, align:"RIGHT", width:0.5}
    ]);
   cashier.tableCustom([                                      
      { text:`Nominal`, align:"LEFT", width:0.5},
      { text:`${nominal}`, align:"RIGHT", width:0.5}
    ]);
   cashier.tableCustom([                                      
      { text:`Change`, align:"LEFT", width:0.5},
      { text:`${change}`, align:"RIGHT", width:0.5}
    ]);
   cashier.drawLine('=');
   cashier.alignCenter();
   cashier.print('Thank You')
   cashier.cut();

    
    
    try {
    cashier.execute()
    console.error("Print done!");
    } catch (error) {
    console.log("Print failed:", error);
    }
  }
}

export const printBill = async(cart)=>{
  let isConnected = await cashier.isPrinterConnected();
  if(!isConnected){
    queueCashier(cart,null,printBill);
  }else{
   cashier.clear();
    const datetime = cart.datetime_data.time_in
    const time_in = datetime.toLocaleTimeString();
    const date_in = datetime.toLocaleDateString();
    const table_no = cart.table;
    const ticketNumber = cart.ticketNumber;
    const width =cashier.getWidth();
    const users = cart.customerusers;
    console.log(width);  
   cashier.alignCenter();
   cashier.bold(true);  
   cashier.println("Bale Lombok");
   cashier.bold(false);  
   cashier.tableCustom([                                      
      { text:date_in, align:"LEFT", width:0.5},
      { text:time_in, align:"RIGHT", width:0.5}
    ]);
   cashier.newLine();  
   cashier.tableCustom([                                      
      { text:`Table: ${table_no}`, align:"LEFT", width:0.4},
      { text:`Ticket No: ${ticketNumber}`, align:"RIGHT", width:0.6}
    ]);
   cashier.alignCenter();
   cashier.drawLine();  
    users.forEach(user =>{
      if(user.fooditems.length >0){
        let name = user.alias_name;
       cashier.alignLeft()
       cashier.print(name);
       cashier.newLine();
        user.fooditems.forEach(fooditem=>{
          let total_price = fooditem.item.unit_price* fooditem.quantity;
          total_price = total_price.toLocaleString();
         cashier.tableCustom([                                      
            { text:`- ${fooditem.quantity} ${fooditem.item.name}`, align:"LEFT", width:0.5},
            { text:`${total_price}`, align:"RIGHT", width:0.5}
          ]);
          if(fooditem.selected_properties){
           cashier.alignLeft();
           cashier.print(` *`)
            const properties = Object.values(fooditem.selected_properties)
            properties.forEach(property => {
             cashier.print(`${property}|`)
            });
           cashier.newLine();
          }
        })
       cashier.drawLine();
      }
    })
    let cart_total = (cart.subtotal + cart.subtotal*0.05 +cart.subtotal*1.05 *0.1).toLocaleString();
    let service = (cart.subtotal*0.05).toLocaleString();
    let PB1 = (cart.subtotal*1.05*0.1).toLocaleString();
   cashier.tableCustom([                                      
      { text:`Service %5`, align:"LEFT", width:0.5},
      { text:`${service}`, align:"RIGHT", width:0.5}
    ]);
   cashier.tableCustom([                                      
      { text:`PB1`, align:"LEFT", width:0.5},
      { text:`${PB1}`, align:"RIGHT", width:0.5}
    ]);
   cashier.tableCustom([                                      
      { text:`Total`, align:"LEFT", width:0.5},
      { text:`${cart_total}`, align:"RIGHT", width:0.5}
    ]);
   cashier.drawLine('=');
   cashier.alignCenter();
   cashier.print('Thank You')
   cashier.cut();

    
    
    try {
    let execute =cashier.execute()
    console.error("Print done!");
    } catch (error) {
    console.log("Print failed:", error);
    }
  }
}

export const printSplitBill = async(cart)=>{
  let isConnected = await cashier.isPrinterConnected();
  if(!isConnected){
    queueCashier(cart,null,printSplitBill);
  }else{
 cashier.clear();
  const datetime = cart.datetime_data.time_in
  const time_in = datetime.toLocaleTimeString();
  const date_in = datetime.toLocaleDateString();
  const table_no = cart.table;
  const ticketNumber = cart.ticketNumber;
  const width =cashier.getWidth();
  const users = cart.customerusers;

  users.forEach(user =>{
   cashier.alignCenter();
   cashier.bold(true);  
   cashier.println("Bale Lombok");
   cashier.bold(false);  
   cashier.tableCustom([                                      
      { text:date_in, align:"LEFT", width:0.5},
      { text:time_in, align:"RIGHT", width:0.5}
    ]);
   cashier.newLine();  
   cashier.tableCustom([                                      
      { text:`Table: ${table_no}`, align:"LEFT", width:0.4},
      { text:`Ticket No: ${ticketNumber}`, align:"RIGHT", width:0.6}
    ]);
   cashier.alignCenter();
   cashier.drawLine();  
    let name = user.alias_name;
   cashier.alignLeft()
   cashier.print(name);
   cashier.newLine();
    user.fooditems.forEach(fooditem=>{
      let total_price = fooditem.item.unit_price* fooditem.quantity;
      total_price = total_price.toLocaleString();
     cashier.tableCustom([                                      
        { text:`- ${fooditem.quantity} ${fooditem.item.name}`, align:"LEFT", width:0.5},
        { text:`${total_price}`, align:"RIGHT", width:0.5}
      ]);
      if(fooditem.selected_properties){
       cashier.alignLeft();
       cashier.print(` *`)
        const properties = Object.values(fooditem.selected_properties)
        properties.forEach(property => {
         cashier.print(`${property}|`)
        });
       cashier.newLine();
      }
    })
   cashier.drawLine();
    let user_total = (user.customer_user_total + user.customer_user_total*0.05 +user.customer_user_total*1.05 *0.1).toLocaleString();
    let service = (user.customer_user_total*0.05).toLocaleString();
    let PB1 = (user.customer_user_total*1.05*0.1).toLocaleString();
   cashier.tableCustom([                                      
      { text:`Service %5`, align:"LEFT", width:0.5},
      { text:`${service}`, align:"RIGHT", width:0.5}
    ]);
   cashier.tableCustom([                                      
      { text:`PB1`, align:"LEFT", width:0.5},
      { text:`${PB1}`, align:"RIGHT", width:0.5}
    ]);
   cashier.tableCustom([                                      
      { text:`Total`, align:"LEFT", width:0.5},
      { text:`${user_total}`, align:"RIGHT", width:0.5}
    ]);
   cashier.drawLine('=');
   cashier.alignCenter();
   cashier.print('Thank You')
   cashier.cut();
  })
 
  try {
  let execute =cashier.execute()
  console.error("Print done!");
  } catch (error) {
  console.log("Print failed:", error);
  }
}
}

export const printKitchen = async(cart)=>{
  let isConnected = await kitchen.isPrinterConnected();
  if(!isConnected){
    queueKitchen(cart,printKitchen);
  }else{
 kitchen.clear();
  const datetime = cart.datetime_data.time_in
  const time_in = datetime.toLocaleTimeString();
  const date_in = datetime.toLocaleDateString();
  const table_no = cart.table;
  const ticketNumber = cart.ticketNumber;
  const width = kitchen.getWidth();
  const users = cart.customerusers;
  kitchen.alignCenter();
  kitchen.bold(true);  
  kitchen.println("Bale Lombok");
  kitchen.bold(false);  
  kitchen.tableCustom([                                      
    { text:date_in, align:"LEFT", width:0.5},
    { text:time_in, align:"RIGHT", width:0.5}
  ]);
  kitchen.newLine();  
  kitchen.tableCustom([                                      
    { text:`Table: ${table_no}`, align:"LEFT", width:0.4},
    { text:`Ticket No: ${ticketNumber}`, align:"RIGHT", width:0.6}
  ]);
  kitchen.alignCenter();
  kitchen.drawLine();  
  users.forEach(user =>{
    let name = user.alias_name;
    kitchen.alignLeft()
    kitchen.print(name);
    kitchen.newLine();
    user.fooditems.forEach(fooditem=>{
      if(fooditem.item_status!="Settled" && (fooditem.item.item_category.head!="Dessert"||fooditem.item.item_category.head!="Drinks")){
        let item_name = fooditem.item.name;
        item_name = item_name.toUpperCase();
        kitchen.alignLeft();
        kitchen.bold(true);
        kitchen.setTextSize(7);
        kitchen.print(`- ${fooditem.quantity} ${item_name}`);
        kitchen.setTextSize(1);
        kitchen.bold(false)
        kitchen.newLine();
        if(fooditem.selected_properties){
          kitchen.alignLeft();
          kitchen.print(` *`)
          const properties = Object.values(fooditem.selected_properties)
          properties.forEach(property => {
            kitchen.print(`${property}|`)
          });
          kitchen.newLine();
        }
      }
    })
    kitchen.drawLine();
  });
  kitchen.partialCut();

  
  
  try {
  let execute = kitchen.execute()
  console.error("Print done!");
  } catch (error) {
  console.log("Print failed:", error);
  }
}
}

export const printVoid = async (cart,FoodItem_id)=>{
  let isConnected = await cashier.isPrinterConnected();
  if(!isConnected){
    queueCashier(cart,FoodItem_id,printVoid);
  }else{
  console.log('called');
  cashier.clear();
  const datetime = cart.datetime_data.time_in
  const time_in = datetime.toLocaleTimeString();
  const date_in = datetime.toLocaleDateString();
  const table_no = cart.table;
  const ticketNumber = cart.ticketNumber;
  const width = cashier.getWidth();
  const users = cart.customerusers;
  cashier.alignCenter();
  cashier.bold(true);  
  cashier.println("Bale Lombok");
  cashier.bold(false);  
  cashier.tableCustom([                                      
    { text:date_in, align:"LEFT", width:0.5},
    { text:time_in, align:"RIGHT", width:0.5}
  ]);
  cashier.newLine();  
  cashier.tableCustom([                                      
    { text:`Table: ${table_no}`, align:"LEFT", width:0.4},
    { text:`Ticket No: ${ticketNumber}`, align:"RIGHT", width:0.6}
  ]);
  cashier.alignCenter();
  cashier.drawLine();  
  users.forEach(user =>{
    let name = user.alias_name;
    cashier.alignLeft()
    cashier.print(name);
    cashier.newLine();
    user.fooditems.forEach(fooditem=>{
      if(fooditem._id == FoodItem_id){
        cashier.alignCenter();
        cashier.setTextSize(7);
        cashier.bold(true);
        cashier.println("*******VOID********")
        let item_name = fooditem.item.name;
        item_name = item_name.toUpperCase();
        cashier.alignLeft();
        cashier.print(`- ${fooditem.quantity} ${item_name}`);
        cashier.setTextSize(1);
        cashier.bold(false)
        cashier.newLine();
        if(fooditem.selected_properties){
          cashier.alignLeft();
          cashier.print(` *`)
          const properties = Object.values(fooditem.selected_properties)
          properties.forEach(property => {
            cashier.print(`${property}|`)
          });
          cashier.newLine();
        }
      }
    })
    cashier.drawLine();
  });
  cashier.cut();

  
  
  try {
  let execute = cashier.execute()
  console.error("Print done!");
  } catch (error) {
  console.log("Print failed:", error);
  }
}
}

export const printBar = async(cart)=>{
  let isConnected = await bar.isPrinterConnected();
  if(!isConnected){
    queueBar(cart,printBar);
  }else{
  bar.clear();
   const datetime = cart.datetime_data.time_in
   const time_in = datetime.toLocaleTimeString();
   const date_in = datetime.toLocaleDateString();
   const table_no = cart.table;
   const ticketNumber = cart.ticketNumber;
   const width = bar.getWidth();
   const users = cart.customerusers;
   bar.alignCenter();
   bar.bold(true);  
   bar.println("Bale Lombok");
   bar.bold(false);  
   bar.tableCustom([                                      
     { text:date_in, align:"LEFT", width:0.5},
     { text:time_in, align:"RIGHT", width:0.5}
   ]);
   bar.newLine();  
   bar.tableCustom([                                      
     { text:`Table: ${table_no}`, align:"LEFT", width:0.4},
     { text:`Ticket No: ${ticketNumber}`, align:"RIGHT", width:0.6}
   ]);
   bar.alignCenter();
   bar.drawLine();  
   users.forEach(user =>{
     let name = user.alias_name;
     bar.alignLeft()
     bar.print(name);
     bar.newLine();
     user.fooditems.forEach(fooditem=>{
       if(fooditem.item_status!="Settled" && (fooditem.item.item_category.head=="Dessert"||fooditem.item.item_category.head=="Drinks")){
         let item_name = fooditem.item.name;
         item_name = item_name.toUpperCase();
         bar.alignLeft();
         bar.bold(true);
         bar.setTextSize(7);
         bar.print(`- ${fooditem.quantity} ${item_name}`);
         bar.setTextSize(1);
         bar.bold(false)
         bar.newLine();
         if(fooditem.selected_properties){
           bar.alignLeft();
           bar.print(` *`)
           const properties = Object.values(fooditem.selected_properties)
           properties.forEach(property => {
             bar.print(`${property}|`)
           });
           bar.newLine();
         }
       }
     })
     bar.drawLine();
   });
   bar.cut();
 
   
   
   try {
   let execute = bar.execute()
   console.error("Print done!");
   } catch (error) {
   console.log("Print failed:", error);
   }
  }
 }
 

 export const printChecker = (cart)=>{
  /* */
  cashier.clear();
   const datetime = cart.datetime_data.time_in
   const time_in = datetime.toLocaleTimeString();
   const date_in = datetime.toLocaleDateString();
   const table_no = cart.table;
   const ticketNumber = cart.ticketNumber;
   const width = cashier.getWidth();
   const users = cart.customerusers;
   cashier.alignCenter();
   cashier.bold(true);  
   cashier.println("Bale Lombok");
   cashier.bold(false);  
   cashier.tableCustom([                                      
     { text:date_in, align:"LEFT", width:0.5},
     { text:time_in, align:"RIGHT", width:0.5}
   ]);
   cashier.newLine();  
   cashier.tableCustom([                                      
     { text:`Table: ${table_no}`, align:"LEFT", width:0.4},
     { text:`Ticket No: ${ticketNumber}`, align:"RIGHT", width:0.6}
   ]);
   cashier.alignCenter();
   cashier.drawLine();  
   users.forEach(user =>{
     let name = user.alias_name;
     cashier.alignLeft()
     cashier.print(name);
     cashier.newLine();
     user.fooditems.forEach(fooditem=>{
       if(fooditem.item_status!="Settled" && (fooditem.item.item_category.head=="Dessert"||fooditem.item.item_category.head=="Drinks")){
         let item_name = fooditem.item.name;
         item_name = item_name.toUpperCase();
         cashier.alignLeft();
         cashier.bold(true);
         cashier.setTextSize(7);
         cashier.print(`- ${fooditem.quantity} ${item_name}`);
         cashier.setTextSize(1);
         cashier.bold(false)
         cashier.newLine();
         if(fooditem.selected_properties){
           cashier.alignLeft();
           cashier.print(` *`)
           const properties = Object.values(fooditem.selected_properties)
           properties.forEach(property => {
             cashier.print(`${property}|`)
           });
           cashier.newLine();
         }
       }
     })
     cashier.drawLine();
   });
   cashier.partialCut();
 
   
   
   try {
   let execute = cashier.execute()
   console.error("Print done!");
   } catch (error) {
   console.log("Print failed:", error);
   }
 }