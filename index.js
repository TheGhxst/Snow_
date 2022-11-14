(async()=>{
    // default imports
    const events = require('events');
    const { exec } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const { 
        MessageEmbed, 
        MessageButton, 
        MessageActionRow, 
        Intents, 
        Permissions, 
        MessageSelectMenu 
    }= require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    const os = require("os-utils");
    const ms = require("ms")
    let https = require("https")
    const synchronizeSlashCommands = require('@frostzzone/discord-sync-commands');
    
    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire:null,
        joiningMember:null,
        reply:null,
        player:null,
        manager:null,
        Inviter:null,
        message:null,
        notifer:null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // check if d.js is v13
    if(!require('./package.json').dependencies['discord.js'].includes("13.")) console.log("Seems you arent using v13 please run `npm i discord.js@13.12.0`");

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION", 
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function (err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code
    

    // blockly code
    var bot_msg, embed_img_img, embed_title, embed_description, embed_img, embed_color;
    
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == '+msg') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          (s4dmessage.channel).send({embeds: [{
          color: String('#3366ff'),
          title: String('Quelle sera le message envoyé avec le bot ?'),
          description: String('Faîtes `cancel` pour annuler '),
          }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           s4d.message = collected.first();
             bot_msg = (s4d.reply);
            if (bot_msg == 'cancel') {
              (s4dmessage.channel).bulkDelete((3|1));
              s4dmessage.channel.send({embeds: [{
              color: String('#33cc00'),
              title: String('L\'embed a bien été annulé !'),
              }]}).then(async (s4dreply) =>{
                 await delay(Number(3)*1000);
                s4dreply.delete();
    
              });
            } else {
              (s4dmessage.channel).bulkDelete((3|1));
              s4dmessage.channel.send(bot_msg);
            }
    
           s4d.reply = null; }).catch(async (e) => { console.error(e);   (s4dmessage.channel).bulkDelete((2|1));
            s4dmessage.channel.send({embeds: [{
            color: String('#ffcc00'),
            title: String('Temp écoulé !'),
            description: String('> Vous avez dépassé le délai de 5 minutes !'),
            }]}).then(async (s4dreply) =>{
               s4dreply.react('🕰️');
              await delay(Number(3)*1000);
              s4dreply.delete();
    
            });
           });
          })
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('Permission manquante : manage server'),
          }]});
        }
      }
    
    });
    
    synchronizeSlashCommands(s4d.client, [
      {
          name: 'help',
      		description: 'obtenir de l\'aide à propos des commandes slash et préfixe mais surtout du serveur',
      		options: [
    
          ]
      },{
          name: 'ping',
      		description: 'regarder le ping actuel du bot',
      		options: [
    
          ]
      },
    ],{
        debug: false,
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == '+embed img') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          (s4dmessage.channel).send({embeds: [{
          color: String('#3366ff'),
          title: String('Quelle sera l\'image de cette embed avec seulement une image ?'),
          description: String('Faîtes `cancel` pour annuler '),
          }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           s4d.message = collected.first();
             embed_img_img = (s4d.reply);
            if (embed_img_img == 'cancel') {
              (s4dmessage.channel).bulkDelete((3|1));
              s4dmessage.channel.send({embeds: [{
              color: String('#33cc00'),
              title: String('L\'embed a bien été annulé !'),
              }]}).then(async (s4dreply) =>{
                 await delay(Number(3)*1000);
                s4dreply.delete();
    
              });
            } else {
              (s4dmessage.channel).bulkDelete((3|1));
              s4dmessage.channel.send({embeds: [{
              image: {
                          url: String(embed_img_img)
                      },
              }]});
            }
    
           s4d.reply = null; }).catch(async (e) => { console.error(e);   (interaction.channel).bulkDelete((2|1));
            s4dmessage.channel.send({embeds: [{
            color: String('#ffcc00'),
            title: String('Temp écoulé !'),
            description: String('> Vous avez dépassé le délai de 5 minutes !'),
            }]}).then(async (s4dreply) =>{
               s4dreply.react('🕰️');
              await delay(Number(3)*1000);
              s4dreply.delete();
    
            });
           });
          })
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante : manage server'),
          }]});
        }
      }
    
    });
    
    s4d.client.on('interactionCreate', async (interaction) => {
            let member = interaction.guild.members.cache.get(interaction.member.user.id)
              if ((interaction.commandName) == 'ping') {
        await interaction.reply({embeds: [{
        color: String('#3366ff'),
        title: String(['> ping actuel : ',s4d.client.ws.ping,'ms'].join('')),
        }], ephemeral: false, components: [] });
      }
    
        });
    
    await s4d.client.login((process.env[String('TOKEN')])).catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    s4d.client.on('interactionCreate', async (interaction) => {
            let member = interaction.guild.members.cache.get(interaction.member.user.id)
              if ((interaction.commandName) == 'help') {
        await interaction.reply({embeds: [{
        color: String('#3366ff'),
        title: String('Information sur le bot : '),
        description: String(`**Bot développé par <@816100601280331827>**
        **Bot créé le : \`12/11/2022\`**
        **Bot version : \`0.0.6\`**
    
        **Commandes :**
    
        /help : Obtenir de l'aide et des information à propos du bot
    
        /ping : voir le ping actuel du bot
    
        +embed : créer un embed avec le bot ( titre, desription, couleur et image )
    
        +embed no img : créer un embed sans image ( titre, couleur description )
    
        +embed img : créer un embed avec seulement une image
    
        **Autres Aides :**
    
        SOON.`),
        }], ephemeral: false, components: [] });
      }
    
        });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == '+embed no img') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          (s4dmessage.channel).send({embeds: [{
          color: String('#3366ff'),
          title: String('Quelle sera le titre de votre embed ?'),
          description: String(`Choisissez un titre pour votre embed
    
          Faîtes \`cancel\` pour annuler`),
          }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           s4d.message = collected.first();
             embed_title = (s4d.reply);
            if (embed_title == 'cancel') {
              (s4dmessage.channel).bulkDelete((2|1));
              s4dmessage.channel.send({embeds: [{
              color: String('#33cc00'),
              title: String('L\'embed a bien été annulé !'),
              }]}).then(async (s4dreply) =>{
                 await delay(Number(3)*1000);
                s4dreply.delete();
    
              });
            } else {
              (s4dmessage.channel).bulkDelete((2|1));
              (s4dmessage.channel).send({embeds: [{
              color: String('#3366ff'),
              title: String('Quelle sera la description de votre embed ?'),
              description: String(`Choisissez un titre pour votre embed
    
              Faîtes \`cancel\` pour annuler`),
              }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
               s4d.message = collected.first();
                 embed_description = (s4d.reply);
                if (embed_title == 'cancel') {
                  (s4dmessage.channel).bulkDelete((2|1));
                  s4dmessage.channel.send({embeds: [{
                  color: String('#33cc00'),
                  title: String('L\'embed a bien été annulé !'),
                  }]}).then(async (s4dreply) =>{
                     await delay(Number(3)*1000);
                    s4dreply.delete();
    
                  });
                } else {
                  (s4dmessage.channel).bulkDelete((2|1));
                  (s4dmessage.channel).send({embeds: [{
                  color: String('#33cc00'),
                  title: String('Quelle sera la couleur de votre embed ?'),
                  description: String(`Couleurs disponible :
    
                  \`blanc\`
                  \`noir\`
                  \`rouge\`
                  \`orange\`
                  \`jaune\`
                  \`vert\`
                  \`bleu cyan\`
                  \`bleu\``),
                  }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
                   s4d.message = collected.first();
                     if ((s4d.reply) == 'blanc') {
                      embed_color = '#ffffff';
                      (s4dmessage.channel).bulkDelete((2|1));
                      s4dmessage.channel.send({embeds: [{
                      color: String(embed_color),
                      title: String(embed_title),
                      description: String(embed_description),
                      }]});
                    } else if ((s4d.reply) == 'noir') {
                      embed_color = '#000000';
                      (s4dmessage.channel).bulkDelete((2|1));
                      s4dmessage.channel.send({embeds: [{
                      color: String(embed_color),
                      title: String(embed_title),
                      description: String(embed_description),
                      }]});
                    } else if ((s4d.reply) == 'rouge') {
                      embed_color = '#ff0000';
                      (s4dmessage.channel).bulkDelete((2|1));
                      s4dmessage.channel.send({embeds: [{
                      color: String(embed_color),
                      title: String(embed_title),
                      description: String(embed_description),
                      }]});
                    } else if ((s4d.reply) == 'orange') {
                      embed_color = '#ff6600';
                      (s4dmessage.channel).bulkDelete((2|1));
                      s4dmessage.channel.send({embeds: [{
                      color: String(embed_color),
                      title: String(embed_title),
                      description: String(embed_description),
                      }]});
                    } else if ((s4d.reply) == 'jaune') {
                      embed_color = '#ffff00';
                      (s4dmessage.channel).bulkDelete((2|1));
                      s4dmessage.channel.send({embeds: [{
                      color: String(embed_color),
                      title: String(embed_title),
                      description: String(embed_description),
                      }]});
                    } else if ((s4d.reply) == 'vert') {
                      embed_color = '#33ff33';
                      (s4dmessage.channel).bulkDelete((2|1));
                      s4dmessage.channel.send({embeds: [{
                      color: String(embed_color),
                      title: String(embed_title),
                      description: String(embed_description),
                      }]});
                    } else if ((s4d.reply) == 'bleu cyan') {
                      embed_color = '#33ffff';
                      (s4dmessage.channel).bulkDelete((2|1));
                      s4dmessage.channel.send({embeds: [{
                      color: String(embed_color),
                      title: String(embed_title),
                      description: String(embed_description),
                      }]});
                    } else if ((s4d.reply) == 'bleu') {
                      embed_color = '#3366ff';
                      (s4dmessage.channel).bulkDelete((2|1));
                      s4dmessage.channel.send({embeds: [{
                      color: String(embed_color),
                      title: String(embed_title),
                      description: String(embed_description),
                      }]});
                    } else if ((s4d.reply) == 'violet') {
                      embed_color = '#6600cc';
                      (s4dmessage.channel).bulkDelete((2|1));
                      s4dmessage.channel.send({embeds: [{
                      color: String(embed_color),
                      title: String(embed_title),
                      description: String(embed_description),
                      }]});
                    } else if ((s4d.reply) == 'rose') {
                      embed_color = '#cc66cc';
                      (s4dmessage.channel).bulkDelete((2|1));
                      s4dmessage.channel.send({embeds: [{
                      color: String(embed_color),
                      title: String(embed_title),
                      description: String(embed_description),
                      }]});
                    } else {
                      s4dmessage.channel.send({embeds: [{
                      color: String('#ff0000'),
                      title: String('couleur invalide !'),
                      description: String('Vérifiez l\'orthographe !'),
                      }]});
                      await delay(Number(1.5)*1000);
                      (s4dmessage.channel).bulkDelete((2|1));
                    }
    
                   s4d.reply = null; }).catch(async (e) => { console.error(e);   (interaction.channel).bulkDelete((1|1));
                    s4dmessage.channel.send({embeds: [{
                    color: String('#ffcc00'),
                    title: String('Temp écoulé !'),
                    description: String('> Vous avez dépassé le délai de 5 minutes !'),
                    }]}).then(async (s4dreply) =>{
                       s4dreply.react('🕰️');
                      await delay(Number(3)*1000);
                      s4dreply.delete();
    
                    });
                   });
                  })
                }
    
               s4d.reply = null; }).catch(async (e) => { console.error(e);   (interaction.channel).bulkDelete((1|1));
                s4dmessage.channel.send({embeds: [{
                color: String('#ffcc00'),
                title: String('Temp écoulé !'),
                description: String('> Vous avez dépassé le délai de 5 minutes !'),
                }]}).then(async (s4dreply) =>{
                   s4dreply.react('🕰️');
                  await delay(Number(3)*1000);
                  s4dreply.delete();
    
                });
               });
              })
            }
    
           s4d.reply = null; }).catch(async (e) => { console.error(e);   (interaction.channel).bulkDelete((1|1));
            s4dmessage.channel.send({embeds: [{
            color: String('#ffcc00'),
            title: String('Temp écoulé !'),
            description: String('> Vous avez dépassé le délai de 5 minutes !'),
            }]}).then(async (s4dreply) =>{
               s4dreply.react('🕰️');
              await delay(Number(3)*1000);
              s4dreply.delete();
    
            });
           });
          })
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante : manage server'),
          }]});
        }
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == '+embed') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          (s4dmessage.channel).send({embeds: [{
          color: String('#3366ff'),
          title: String('Quelle sera le titre de votre embed ?'),
          description: String(`Choisissez un titre pour votre embed
    
          Faîtes \`cancel\` pour annuler`),
          }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           s4d.message = collected.first();
             embed_title = (s4d.reply);
            if (embed_title == 'cancel') {
              (s4dmessage.channel).bulkDelete((2|1));
              s4dmessage.channel.send({embeds: [{
              color: String('#33cc00'),
              title: String('L\'embed a bien été annulé !'),
              }]}).then(async (s4dreply) =>{
                 await delay(Number(3)*1000);
                s4dreply.delete();
    
              });
            } else {
              (s4dmessage.channel).bulkDelete((2|1));
              (s4dmessage.channel).send({embeds: [{
              color: String('#3366ff'),
              title: String('Quelle sera la description de votre embed ?'),
              description: String(`Choisissez un titre pour votre embed
    
              Faîtes \`cancel\` pour annuler`),
              }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
               s4d.message = collected.first();
                 embed_description = (s4d.reply);
                if (embed_title == 'cancel') {
                  (s4dmessage.channel).bulkDelete((2|1));
                  s4dmessage.channel.send({embeds: [{
                  color: String('#33cc00'),
                  title: String('L\'embed a bien été annulé !'),
                  }]}).then(async (s4dreply) =>{
                     await delay(Number(3)*1000);
                    s4dreply.delete();
    
                  });
                } else {
                  (s4dmessage.channel).bulkDelete((2|1));
                  (s4dmessage.channel).send({embeds: [{
                  color: String('#3366ff'),
                  title: String('Quelle sera l\'image de votre embed ?'),
                  description: String(`choisissez une image pour votre embed
    
                  Faîtes \`cancel\` pour annuler`),
                  }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
                   s4d.message = collected.first();
                     embed_img = (s4d.reply);
                    if (embed_img == 'cancel') {
                      (s4dmessage.channel).bulkDelete((2|1));
                      s4dmessage.channel.send({embeds: [{
                      color: String('#33cc00'),
                      title: String('L\'embed a bien été annulé !'),
                      }]}).then(async (s4dreply) =>{
                         await delay(Number(3)*1000);
                        s4dreply.delete();
    
                      });
                    } else {
                      (s4dmessage.channel).bulkDelete((2|1));
                      (s4dmessage.channel).send({embeds: [{
                      color: String('#33cc00'),
                      title: String('Quelle sera la couleur de votre embed ?'),
                      description: String(`Couleurs disponible :
    
                      \`blanc\`
                      \`noir\`
                      \`rouge\`
                      \`orange\`
                      \`jaune\`
                      \`vert\`
                      \`bleu cyan\`
                      \`bleu\``),
                      }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
                       s4d.message = collected.first();
                         if ((s4d.reply) == 'blanc') {
                          embed_color = '#ffffff';
                          (s4dmessage.channel).bulkDelete((2|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String(embed_color),
                          title: String(embed_title),
                          description: String(embed_description),
                          image: {
                                      url: String(embed_img)
                                  },
                          }]});
                        } else if ((s4d.reply) == 'noir') {
                          embed_color = '#000000';
                          (s4dmessage.channel).bulkDelete((2|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String(embed_color),
                          title: String(embed_title),
                          description: String(embed_description),
                          image: {
                                      url: String(embed_img)
                                  },
                          }]});
                        } else if ((s4d.reply) == 'rouge') {
                          embed_color = '#ff0000';
                          (s4dmessage.channel).bulkDelete((2|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String(embed_color),
                          title: String(embed_title),
                          description: String(embed_description),
                          image: {
                                      url: String(embed_img)
                                  },
                          }]});
                        } else if ((s4d.reply) == 'orange') {
                          embed_color = '#ff6600';
                          (s4dmessage.channel).bulkDelete((2|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String(embed_color),
                          title: String(embed_title),
                          description: String(embed_description),
                          image: {
                                      url: String(embed_img)
                                  },
                          }]});
                        } else if ((s4d.reply) == 'jaune') {
                          embed_color = '#ffff00';
                          (s4dmessage.channel).bulkDelete((2|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String(embed_color),
                          title: String(embed_title),
                          description: String(embed_description),
                          image: {
                                      url: String(embed_img)
                                  },
                          }]});
                        } else if ((s4d.reply) == 'vert') {
                          embed_color = '#33ff33';
                          (s4dmessage.channel).bulkDelete((2|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String(embed_color),
                          title: String(embed_title),
                          description: String(embed_description),
                          image: {
                                      url: String(embed_img)
                                  },
                          }]});
                        } else if ((s4d.reply) == 'bleu cyan') {
                          embed_color = '#33ffff';
                          (s4dmessage.channel).bulkDelete((2|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String(embed_color),
                          title: String(embed_title),
                          description: String(embed_description),
                          image: {
                                      url: String(embed_img)
                                  },
                          }]});
                        } else if ((s4d.reply) == 'bleu') {
                          embed_color = '#3366ff';
                          (s4dmessage.channel).bulkDelete((2|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String(embed_color),
                          title: String(embed_title),
                          description: String(embed_description),
                          image: {
                                      url: String(embed_img)
                                  },
                          }]});
                        } else if ((s4d.reply) == 'violet') {
                          embed_color = '#6600cc';
                          (s4dmessage.channel).bulkDelete((2|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String(embed_color),
                          title: String(embed_title),
                          description: String(embed_description),
                          image: {
                                      url: String(embed_img)
                                  },
                          }]});
                        } else if ((s4d.reply) == 'rose') {
                          embed_color = '#cc66cc';
                          (s4dmessage.channel).bulkDelete((2|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String(embed_color),
                          title: String(embed_title),
                          description: String(embed_description),
                          image: {
                                      url: String(embed_img)
                                  },
                          }]});
                        } else {
                          s4dmessage.channel.send({embeds: [{
                          color: String('#ff0000'),
                          title: String('couleur invalide !'),
                          description: String('Vérifiez l\'orthographe !'),
                          }]});
                          await delay(Number(1.5)*1000);
                          (s4dmessage.channel).bulkDelete((2|1));
                        }
    
                       s4d.reply = null; }).catch(async (e) => { console.error(e);   (interaction.channel).bulkDelete((1|1));
                        s4dmessage.channel.send({embeds: [{
                        color: String('#ffcc00'),
                        title: String('Temp écoulé !'),
                        description: String('> Vous avez dépassé le délai de 5 minutes !'),
                        }]}).then(async (s4dreply) =>{
                           s4dreply.react('🕰️');
                          await delay(Number(3)*1000);
                          s4dreply.delete();
    
                        });
                       });
                      })
                    }
    
                   s4d.reply = null; }).catch(async (e) => { console.error(e);   (interaction.channel).bulkDelete((1|1));
                    s4dmessage.channel.send({embeds: [{
                    color: String('#ffcc00'),
                    title: String('Temp écoulé !'),
                    description: String('> Vous avez dépassé le délai de 5 minutes !'),
                    }]}).then(async (s4dreply) =>{
                       s4dreply.react('🕰️');
                      await delay(Number(3)*1000);
                      s4dreply.delete();
    
                    });
                   });
                  })
                }
    
               s4d.reply = null; }).catch(async (e) => { console.error(e);   (interaction.channel).bulkDelete((1|1));
                s4dmessage.channel.send({embeds: [{
                color: String('#ffcc00'),
                title: String('Temp écoulé !'),
                description: String('> Vous avez dépassé le délai de 5 minutes !'),
                }]}).then(async (s4dreply) =>{
                   s4dreply.react('🕰️');
                  await delay(Number(3)*1000);
                  s4dreply.delete();
    
                });
               });
              })
            }
    
           s4d.reply = null; }).catch(async (e) => { console.error(e);   (interaction.channel).bulkDelete((1|1));
            s4dmessage.channel.send({embeds: [{
            color: String('#ffcc00'),
            title: String('Temp écoulé !'),
            description: String('> Vous avez dépassé le délai de 5 minutes !'),
            }]}).then(async (s4dreply) =>{
               s4dreply.react('🕰️');
              await delay(Number(3)*1000);
              s4dreply.delete();
    
            });
           });
          })
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante : manage server'),
          }]});
        }
      }
    
    });
    
    s4d.client.on('ready', async () => {
      s4d.client.user.setPresence({status: "online",activities:[{name:'Snow  #Welcome',type:"WATCHING"}]});
    
    });
    
    return s4d
})();