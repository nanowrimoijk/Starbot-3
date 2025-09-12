let prefix = process.env.PREFIX;

module.exports = {
  name: "slots",
  description: "Roll the slots for absolutely no reason!",
  usage: `${prefix}slots`,
  developer: false, 
  category: 'general/econ', 

  execute(client, message, args, Discord) {
    let result = [];

    let items = [
      { name: 'space_invader', id: 1030612098721525872, value: 0 },
      { name: 'cherries', id: 1030612360576114838, value: 2 },
      { name: 'grapes', id: 1030612387390291998, value: 5 },
      { name: 'tangerine', id: 1030612397607616512, value: 10 },
      { name: 'musical_note', id: 1030612423184498791, value: 20 },
      { name: 'crescent_moon', id: 1030612442457317417, value: 30 },
      { name: 'star2', id: 1030612475604893846, value: 50 },
    ];

    try {
      for (let i = 3; i > 0; i--) {
        result.push(items[
          Math.floor(Math.random() * items.length)
        ]);
      }

      //<:Starbreak_has_a_neck_1:769043388417966100>

      let score = 0;

      //console.log(result);

      message.channel.send(`★${message.author} spun the slots!★
:slot_machine: You got...`);


      result.forEach(function(ele) {
        message.channel.send(`<:${ele.name}:${ele.id}>`);
        score += ele.value;
      });

      if (result[0] == result[1] && result[1] == result[2]){
        score += result[0].value;
      }

      message.channel.send(`:star2: --- 50     :crescent_moon: --- 30
:musical_note: --- 20     :tangerine: --- 10
:grapes: --- 5     :cherries: --- 2
:space_invader: --- 0
3 of a kind --- +1 value
of what you matched
You scored: ${score.toString()} points!`);

      //message.channel.send(`You scored: ${score.toString()} points!`);
    } catch (error) { console.log(error) }

    //message.channel.send(result.join("\n"));


  }
}
