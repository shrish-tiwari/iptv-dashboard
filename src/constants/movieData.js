export const CONTENT_DATA = {
  movies: [
    { 
      id: 1, type: 'movie', title: "WAR MACHINE", 
      img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80", 
      year: "2024", match: "98%", desc: "Action packed military thriller.",
      progress: 45
    },
    { 
      id: 2, type: 'movie', title: "MRITHYUNJAY", 
      img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80", 
      year: "2024", match: "95%", desc: "A crime reporter's journey.",
      progress: 0 
    },
    { 
      id: 3, type: 'movie', title: "GLADIATOR II", 
      img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80", 
      year: "2024", match: "91%", desc: "Historical epic.",
      progress: 80 
    },
    { 
      id: 10, type: 'movie', title: "INCEPTION", 
      img: "https://images.unsplash.com/photo-1535016120720-40c646bebbbb?auto=format&fit=crop&w=800&q=80", 
      year: "2010", match: "99%", desc: "Dream within a dream.",
      progress: 15
    },
    { 
      id: 11, type: 'movie', title: "AVENGERS", 
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", 
      year: "2019", match: "97%", desc: "Superheroes assemble.",
      progress: 0
    },
  ],

  webSeries: [
    { 
      id: 4, type: 'series', title: "STRANGER THINGS", 
      img: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&w=800&q=80", 
      year: "2024", match: "99%", desc: "A group of kids uncover a government conspiracy.",
      progress: 60,
      seasons: "4 Seasons",
      genres: ["Sci-Fi", "Mystery", "Teen"],

      episodes: [
        { 
          id: "s1e1", title: "Chapter One: The Vanishing", duration: "48m", 
          thumb: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&w=300&q=80",
          desc: "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab."
        },
        { 
          id: "s1e2", title: "Chapter Two: The Weirdo", duration: "52m", 
          thumb: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&w=300&q=80",
          desc: "Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about a disturbing phone call."
        },
        { 
          id: "s1e3", title: "Chapter Three: Holly Jolly", duration: "50m", 
          thumb: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&w=300&q=80",
          desc: "An increasingly concerned Nancy looks for Barb and finds out what Jonathan's been up to. Joyce believes Will is communicating with her."
        },
        { 
          id: "e4", title: "Chapter Four: The Body", duration: "51m", 
          thumb: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&w=300&q=80",
          desc: "Refusing to believe Will is dead, Joyce tries to connect with her son. the boys give Eleven a makeover. Nancy and Jonathan form an alliance."
        },
        { 
          id: "e5", title: "Chapter Five: The Flea and the Acrobat", duration: "53m", 
          thumb: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&w=300&q=80",
          desc: "Hopper breaks into the lab while Nancy and Jonathan confront the force that took Will. The boys ask Mr. Clarke how to travel to another dimension."
        },
        { 
          id: "e6", title: "Chapter Six: The Monster", duration: "47m", 
          thumb: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&w=300&q=80",
          desc: "A frantic Jonathan looks for Nancy in the darkness, but Steve is also looking for her. Hopper and Joyce find the truth about the lab's experiments."
        },
        { 
          id: "e7", title: "Chapter Seven: The Bathtub", duration: "42m", 
          thumb: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&w=300&q=80",
          desc: "Eleven struggles to reach Will, while Lucas warns that 'the bad men are coming.' Nancy and Jonathan show Hopper what they caught on camera."
        },
        { 
          id: "e8", title: "Chapter Eight: The Upside Down", duration: "54m", 
          thumb: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&w=300&q=80",
          desc: "Dr. Brenner detains Hopper and Joyce while the boys and Eleven wait in the gym. Back at the lab, a deadly showdown begins."
        },
        { 
          id: "e9", title: "Chapter Nine: The Gate", duration: "62m", 
          thumb: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&w=300&q=80",
          desc: "Hopper and Eleven head to the lab to close the gate. The group faces an army of monsters as they fight to save Hawkins from the Mind Flayer."
        },
        { 
          id: "e10", title: "Chapter Ten: The Spy", duration: "50m", 
          thumb: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&w=300&q=80",
          desc: "Will's connection to the shadow monster grows stronger, and no one knows how to stop it. A trusted friend might be the only key to survival."
        },
        { 
          id: "e11", title: "Chapter Eleven: The Mind Flayer", duration: "48m", 
          thumb: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&w=300&q=80",
          desc: "The lab is on lockdown as a deadly threat emerges from within. The kids realize that the monster is more intelligent than they ever imagined."
        },
        { 
          id: "e12", title: "Chapter Twelve: The Battle", duration: "77m", 
          thumb: "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?auto=format&fit=crop&w=300&q=80",
          desc: "In an epic finale at the mall, the heroes must give everything to protect their town. A heart-breaking sacrifice changes Hawkins forever."
        },
      ]
    },

    { 
      id: 5, type: 'series', title: "LUCIFER", 
      img: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&w=800&q=80", 
      year: "2021", match: "89%", desc: "The Devil moves to Los Angeles for a change of pace.",
      progress: 30,
      episodes: [
        { id: "l1e1", title: "Pilot", duration: "44m" },
        { id: "l1e2", title: "Lucifer, Stay. Good Devil.", duration: "43m" }
      ]
    },

    { 
      id: 6, type: 'series', title: "MONEY HEIST", 
      img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80", 
      year: "2021", match: "97%", desc: "Eight thieves take hostages in the Royal Mint.",
      progress: 90
    },

    { id: 12, type: 'series', title: "THE BOYS", img: "https://images.unsplash.com/photo-1620336655052-b57986f5a26a?auto=format&fit=crop&w=800&q=80", year: "2024", match: "96%", desc: "Vigilantes set out to take down corrupt superheroes.", progress: 10 },

    { id: 30, type: 'series', title: "BREAKING BAD", img: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=800&q=80", year: "2013", match: "100%", desc: "A high school chemistry teacher turned drug lord.", progress: 50 },

    { id: 31, type: 'series', title: "MIRZAPUR", img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80", year: "2023", match: "98%", desc: "The journey of Akhandanand Tripathi and his son Munna.", progress: 25 },
  ],

  tvShows: [
    { id: 7, type: 'show', title: "SNOWPIERCER", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80", year: "2022", match: "85%", desc: "Survivors live on a train.", progress: 40 },
    { id: 8, type: 'show', title: "THE WITCHER", img: "https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80", year: "2023", match: "92%", desc: "Monster hunter story.", progress: 0 },
    { id: 9, type: 'show', title: "DARK", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80", year: "2020", match: "94%", desc: "Time travel mystery.", progress: 75 },
    { id: 13, type: 'show', title: "SUITS", img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80", year: "2019", match: "93%", desc: "Law drama.", progress: 10 },
  ]
};