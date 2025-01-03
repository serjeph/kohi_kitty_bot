const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const assert = require("assert");
//Connect to database


// MODELS
const Data = require("../../helper/data");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('check your balance')
    .addUserOption( option =>(
      option.setName("target")
      .setDescription('the someone')
  ))
  .setDescription('Check someones balance'),
  async execute(interaction){

  const checkUser = interaction.options.getUser("target");
    

      if(!checkUser){
        let userData = await Data.findOne({userID: interaction.user.id});
        if(userData){
          await Data.findOneAndUpdate({userID:interaction.user.id},{name:interaction.user.username}).then(function(){
              Data.findOne({userID:interaction.user.id}).then(function(result){
                assert(result.name === interaction.user.username)
                console.log(`User's username (${interaction.user.username}) is updated to DB`)
              })
            }
          )
              let balanceEmbed = new EmbedBuilder()
              .setColor("#1bb369")
              .setTitle(`${interaction.user.username}'s Balance`)
              .setURL("https://www.youtube.com/watch?v=vNhs9CSI0Vc/")
              .setDescription(`<:tuna:1320596587373658195>  **${userData.tuna}** `)
              interaction.reply({embeds:[balanceEmbed]});
              return;
          };
  
        if(!userData){
          let newData = await Data.create({
            name: interaction.user.username,
            userID: interaction.user.id,
            tuna: 0,
            daily: 0,
          })
  
          newData.save().catch(err => console.log(err));
          let balanceEmbed = new EmbedBuilder()
          .setColor("#1bb369")
          .setTitle(`${interaction.user.username}'s Balance`)
          .setURL("https://www.youtube.com/watch?v=vNhs9CSI0Vc/")
          .setDescription(`<:tuna:1320596587373658195>  **0** `)
          interaction.reply({embeds:[balanceEmbed]});
          return;
          }
      } else{
        let otherUser = await Data.findOne({userID: checkUser.id});
        if(otherUser){
          await Data.findOneAndUpdate({userID:otherUser},{name:checkUser.username}).then(function(){
            Data.findOne({userID:checkUser.id}).then(function(result){
              assert(result.name === checkUser.username)
              console.log(`User's username (${checkUser.username}) is updated to DB`)
            })
          }
        )
            let balanceEmbed = new EmbedBuilder()
            .setColor("#1bb369")
            .setTitle(`${checkUser.username}'s Balance`)
            .setURL("https://www.youtube.com/watch?v=vNhs9CSI0Vc/")
            .setDescription(`<:tuna:1320596587373658195>  **${otherUser.tuna}** `)
            interaction.reply({embeds:[balanceEmbed]});
            return;
        }
        
        };

        if(!otherUser){
          let newData = await Data.create({
            name: checkUser.username,
            userID: otherUser,
            tuna: 0,
            daily: 0,
          })
  
          newData.save().catch(err => console.log(err));
          let balanceEmbed = new EmbedBuilder()
          .setColor("#1bb369")
          .setTitle(`${checkUser.username}'s Balance`)
          .setURL("https://www.youtube.com/watch?v=vNhs9CSI0Vc/")
          .setDescription(`<:tuna:1320596587373658195>  **0** `)
          interaction.reply({embeds:[balanceEmbed]});
          return;
        }

      
  }};