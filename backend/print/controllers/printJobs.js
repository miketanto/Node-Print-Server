import PrintLib from 'node-thermal-printer'
const ThermalPrinter = PrintLib.printer;
const PrinterTypes = PrintLib.types;

let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: 'tcp://192.168.0.120',
    width:40,
  });


  export const printFinalBill = (cart,payment_data)=>{
    printer.clear();
    const datetime = cart.datetime_data.time_in
    const time_in = datetime.toLocaleTimeString();
    const date_in = datetime.toLocaleDateString();
    const table_no = cart.table;
    const ticketNumber = cart.ticketNumber;
    const width = printer.getWidth();
    const users = cart.customerusers;
    const nominal=payment_data.nominal.toLocaleString();
    const change=payment_data.change.toLocaleString();
    console.log(width);  
    printer.alignCenter();
    printer.bold(true);  
    printer.println("Bale Lombok");
    printer.bold(false);  
    printer.tableCustom([                                      
      { text:date_in, align:"LEFT", width:0.5},
      { text:time_in, align:"RIGHT", width:0.5}
    ]);
    printer.newLine();  
    printer.tableCustom([                                      
      { text:`Table: ${table_no}`, align:"LEFT", width:0.4},
      { text:`Ticket No: ${ticketNumber}`, align:"RIGHT", width:0.6}
    ]);
    printer.alignCenter();
    printer.drawLine();  
    users.forEach(user =>{
      if(user.fooditems.length >0){
        let name = user.alias_name;
        printer.alignLeft()
        printer.print(name);
        printer.newLine();
        user.fooditems.forEach(fooditem=>{
          let total_price = fooditem.item.unit_price* fooditem.quantity;
          total_price = total_price.toLocaleString();
          printer.tableCustom([                                      
            { text:`- ${fooditem.quantity} ${fooditem.item.name}`, align:"LEFT", width:0.5},
            { text:`${total_price}`, align:"RIGHT", width:0.5}
          ]);
          if(fooditem.selected_properties){
            printer.alignLeft();
            printer.print(` *`)
            const properties = Object.values(fooditem.selected_properties)
            properties.forEach(property => {
              printer.print(`${property}|`)
            });
            printer.newLine();
          }
        })
        printer.drawLine();
      }
    })
    let cart_total = (cart.subtotal + cart.subtotal*0.05 +cart.subtotal*1.05 *0.1).toLocaleString();
    let service = (cart.subtotal*0.05).toLocaleString();
    let PB1 = (cart.subtotal*1.05*0.1).toLocaleString();
    printer.tableCustom([                                      
      { text:`Service %5`, align:"LEFT", width:0.5},
      { text:`${service}`, align:"RIGHT", width:0.5}
    ]);
    printer.tableCustom([                                      
      { text:`PB1`, align:"LEFT", width:0.5},
      { text:`${PB1}`, align:"RIGHT", width:0.5}
    ]);
    printer.tableCustom([                                      
      { text:`Total`, align:"LEFT", width:0.5},
      { text:`${cart_total}`, align:"RIGHT", width:0.5}
    ]);
    printer.drawLine('=');

    printer.tableCustom([                                      
      { text:`Payment Type`, align:"LEFT", width:0.5},
      { text:`${payment_data.payment_type}`, align:"RIGHT", width:0.5}
    ]);
    printer.tableCustom([                                      
      { text:`Nominal`, align:"LEFT", width:0.5},
      { text:`${nominal}`, align:"RIGHT", width:0.5}
    ]);
    printer.tableCustom([                                      
      { text:`Change`, align:"LEFT", width:0.5},
      { text:`${change}`, align:"RIGHT", width:0.5}
    ]);
    printer.drawLine('=');
    printer.alignCenter();
    printer.print('Thank You')
    printer.cut();

    
    
    try {
    let execute = printer.execute()
    console.error("Print done!");
    } catch (error) {
    console.log("Print failed:", error);
    }
}

export const printBill = (cart)=>{
    printer.clear();
    const datetime = cart.datetime_data.time_in
    const time_in = datetime.toLocaleTimeString();
    const date_in = datetime.toLocaleDateString();
    const table_no = cart.table;
    const ticketNumber = cart.ticketNumber;
    const width = printer.getWidth();
    const users = cart.customerusers;
    console.log(width);  
    printer.alignCenter();
    printer.bold(true);  
    printer.println("Bale Lombok");
    printer.bold(false);  
    printer.tableCustom([                                      
      { text:date_in, align:"LEFT", width:0.5},
      { text:time_in, align:"RIGHT", width:0.5}
    ]);
    printer.newLine();  
    printer.tableCustom([                                      
      { text:`Table: ${table_no}`, align:"LEFT", width:0.4},
      { text:`Ticket No: ${ticketNumber}`, align:"RIGHT", width:0.6}
    ]);
    printer.alignCenter();
    printer.drawLine();  
    users.forEach(user =>{
      if(user.fooditems.length >0){
        let name = user.alias_name;
        printer.alignLeft()
        printer.print(name);
        printer.newLine();
        user.fooditems.forEach(fooditem=>{
          let total_price = fooditem.item.unit_price* fooditem.quantity;
          total_price = total_price.toLocaleString();
          printer.tableCustom([                                      
            { text:`- ${fooditem.quantity} ${fooditem.item.name}`, align:"LEFT", width:0.5},
            { text:`${total_price}`, align:"RIGHT", width:0.5}
          ]);
          if(fooditem.selected_properties){
            printer.alignLeft();
            printer.print(` *`)
            const properties = Object.values(fooditem.selected_properties)
            properties.forEach(property => {
              printer.print(`${property}|`)
            });
            printer.newLine();
          }
        })
        printer.drawLine();
      }
    })
    let cart_total = (cart.subtotal + cart.subtotal*0.05 +cart.subtotal*1.05 *0.1).toLocaleString();
    let service = (cart.subtotal*0.05).toLocaleString();
    let PB1 = (cart.subtotal*1.05*0.1).toLocaleString();
    printer.tableCustom([                                      
      { text:`Service %5`, align:"LEFT", width:0.5},
      { text:`${service}`, align:"RIGHT", width:0.5}
    ]);
    printer.tableCustom([                                      
      { text:`PB1`, align:"LEFT", width:0.5},
      { text:`${PB1}`, align:"RIGHT", width:0.5}
    ]);
    printer.tableCustom([                                      
      { text:`Total`, align:"LEFT", width:0.5},
      { text:`${cart_total}`, align:"RIGHT", width:0.5}
    ]);
    printer.drawLine('=');
    printer.alignCenter();
    printer.print('Thank You')
    printer.cut();

    
    
    try {
    let execute = printer.execute()
    console.error("Print done!");
    } catch (error) {
    console.log("Print failed:", error);
    }
}

export const printSplitBill = (cart)=>{
  printer.clear();
  const datetime = cart.datetime_data.time_in
  const time_in = datetime.toLocaleTimeString();
  const date_in = datetime.toLocaleDateString();
  const table_no = cart.table;
  const ticketNumber = cart.ticketNumber;
  const width = printer.getWidth();
  const users = cart.customerusers;

  users.forEach(user =>{
    printer.alignCenter();
    printer.bold(true);  
    printer.println("Bale Lombok");
    printer.bold(false);  
    printer.tableCustom([                                      
      { text:date_in, align:"LEFT", width:0.5},
      { text:time_in, align:"RIGHT", width:0.5}
    ]);
    printer.newLine();  
    printer.tableCustom([                                      
      { text:`Table: ${table_no}`, align:"LEFT", width:0.4},
      { text:`Ticket No: ${ticketNumber}`, align:"RIGHT", width:0.6}
    ]);
    printer.alignCenter();
    printer.drawLine();  
    let name = user.alias_name;
    printer.alignLeft()
    printer.print(name);
    printer.newLine();
    user.fooditems.forEach(fooditem=>{
      let total_price = fooditem.item.unit_price* fooditem.quantity;
      total_price = total_price.toLocaleString();
      printer.tableCustom([                                      
        { text:`- ${fooditem.quantity} ${fooditem.item.name}`, align:"LEFT", width:0.5},
        { text:`${total_price}`, align:"RIGHT", width:0.5}
      ]);
      if(fooditem.selected_properties){
        printer.alignLeft();
        printer.print(` *`)
        const properties = Object.values(fooditem.selected_properties)
        properties.forEach(property => {
          printer.print(`${property}|`)
        });
        printer.newLine();
      }
    })
    printer.drawLine();
    let user_total = (user.customer_user_total + user.customer_user_total*0.05 +user.customer_user_total*1.05 *0.1).toLocaleString();
    let service = (user.customer_user_total*0.05).toLocaleString();
    let PB1 = (user.customer_user_total*1.05*0.1).toLocaleString();
    printer.tableCustom([                                      
      { text:`Service %5`, align:"LEFT", width:0.5},
      { text:`${service}`, align:"RIGHT", width:0.5}
    ]);
    printer.tableCustom([                                      
      { text:`PB1`, align:"LEFT", width:0.5},
      { text:`${PB1}`, align:"RIGHT", width:0.5}
    ]);
    printer.tableCustom([                                      
      { text:`Total`, align:"LEFT", width:0.5},
      { text:`${user_total}`, align:"RIGHT", width:0.5}
    ]);
    printer.drawLine('=');
    printer.alignCenter();
    printer.print('Thank You')
    printer.cut();
  })
 
  try {
  let execute = printer.execute()
  console.error("Print done!");
  } catch (error) {
  console.log("Print failed:", error);
  }
}

export const printKitchen = (cart)=>{
  printer.clear();
  const datetime = cart.datetime_data.time_in
  const time_in = datetime.toLocaleTimeString();
  const date_in = datetime.toLocaleDateString();
  const table_no = cart.table;
  const ticketNumber = cart.ticketNumber;
  const width = printer.getWidth();
  const users = cart.customerusers;
  printer.alignCenter();
  printer.bold(true);  
  printer.println("Bale Lombok");
  printer.bold(false);  
  printer.tableCustom([                                      
    { text:date_in, align:"LEFT", width:0.5},
    { text:time_in, align:"RIGHT", width:0.5}
  ]);
  printer.newLine();  
  printer.tableCustom([                                      
    { text:`Table: ${table_no}`, align:"LEFT", width:0.4},
    { text:`Ticket No: ${ticketNumber}`, align:"RIGHT", width:0.6}
  ]);
  printer.alignCenter();
  printer.drawLine();  
  users.forEach(user =>{
    let name = user.alias_name;
    printer.alignLeft()
    printer.print(name);
    printer.newLine();
    user.fooditems.forEach(fooditem=>{
      if(fooditem.item_status!="Settled"){
        let item_name = fooditem.item.name;
        item_name = item_name.toUpperCase();
        printer.alignLeft();
        printer.bold(true);
        printer.setTextSize(7);
        printer.print(`- ${fooditem.quantity} ${item_name}`);
        printer.setTextSize(1);
        printer.bold(false)
        printer.newLine();
        if(fooditem.selected_properties){
          printer.alignLeft();
          printer.print(` *`)
          const properties = Object.values(fooditem.selected_properties)
          properties.forEach(property => {
            printer.print(`${property}|`)
          });
          printer.newLine();
        }
      }
    })
    printer.drawLine();
  });
  printer.cut();

  
  
  try {
  let execute = printer.execute()
  console.error("Print done!");
  } catch (error) {
  console.log("Print failed:", error);
  }
}

export const printVoid = (cart,FoodItem_id)=>{
  console.log('called');
  printer.clear();
  const datetime = cart.datetime_data.time_in
  const time_in = datetime.toLocaleTimeString();
  const date_in = datetime.toLocaleDateString();
  const table_no = cart.table;
  const ticketNumber = cart.ticketNumber;
  const width = printer.getWidth();
  const users = cart.customerusers;
  printer.alignCenter();
  printer.bold(true);  
  printer.println("Bale Lombok");
  printer.bold(false);  
  printer.tableCustom([                                      
    { text:date_in, align:"LEFT", width:0.5},
    { text:time_in, align:"RIGHT", width:0.5}
  ]);
  printer.newLine();  
  printer.tableCustom([                                      
    { text:`Table: ${table_no}`, align:"LEFT", width:0.4},
    { text:`Ticket No: ${ticketNumber}`, align:"RIGHT", width:0.6}
  ]);
  printer.alignCenter();
  printer.drawLine();  
  users.forEach(user =>{
    let name = user.alias_name;
    printer.alignLeft()
    printer.print(name);
    printer.newLine();
    user.fooditems.forEach(fooditem=>{
      if(fooditem._id == FoodItem_id){
        printer.alignCenter();
        printer.setTextSize(7);
        printer.bold(true);
        printer.println("*******VOID********")
        let item_name = fooditem.item.name;
        item_name = item_name.toUpperCase();
        printer.alignLeft();
        printer.print(`- ${fooditem.quantity} ${item_name}`);
        printer.setTextSize(1);
        printer.bold(false)
        printer.newLine();
        if(fooditem.selected_properties){
          printer.alignLeft();
          printer.print(` *`)
          const properties = Object.values(fooditem.selected_properties)
          properties.forEach(property => {
            printer.print(`${property}|`)
          });
          printer.newLine();
        }
      }
    })
    printer.drawLine();
  });
  printer.cut();

  
  
  try {
  let execute = printer.execute()
  console.error("Print done!");
  } catch (error) {
  console.log("Print failed:", error);
  }
}

