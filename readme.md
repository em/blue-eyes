#Background

The blue-eyes puzzle is called "the hardest logic puzzle in the world" by XKCD.

1. http://xkcd.com/blue_eyes.html
2. http://xkcd.com/solution.html

I personally found [this variation and discussion](http://terrytao.wordpress.com/2011/04/07/the-blue-eyed-islanders-puzzle-repost/) the most insightful, if you don't mind reading wordpress comments all day.

And here is the [Wikipedia article on common knowledge](http://en.wikipedia.org/wiki/Common_knowledge_(logic\)).

Spoiler: It's hard because it's wrong. (sorta) The more interesting question is exactly how it is wrong, and why it causes so much debate.

#My take

In order to help myself understand it, I wrote a little Javascript to codify the states and logic in a syntax that I am familiar with.

```
Eye colors: blue,blue,blue,brown,brown,brown
Day of announcement: 5

day:  -5    dead:   0
day:  -4    dead:   0
day:  -3    dead:   0
day:  -2    dead:   0
day:  -1    dead:   0
day:   0    dead:   0  (announcement)
day:   1    dead:   0
day:   2    dead:   0
day:   3    dead:   3
day:   4    dead:   3
day:   5    dead:   3
```

While I was able to reproduce the result, I had to cheat in one small place and this taught me a lot about what is right and what is wrong with the puzzle.

I now believe the logic the puzzle demonstrates is not complex, but appears so because the puzzle uses an [isolated logical fallacy](https://en.wikipedia.org/wiki/Affirming_the_consequent) to make a state transition, which then serves to demonstrate common knowledge.

I also do not think that using a logical fallacy as a premise for demonstrating another logical concept, qualifies as meeting "the spirit" of the puzzle. It's also not necessary.

Here's my attempt at describing the problem:
```
  conditions: 
    A: Everyone knows that everyone sees all other blue eyes
    B: Everyone knows that everyone knows there are any blue eyes

  premise:
    In order for the program to work and all blue-eyes to die, (A) must be true.

  states:
    Before announcement
      (B) is false, if (A) were true (B) would be true.
      Therefore, (A) is false.

    After announcement
      (B) becomes true but (A) is not changed, (B) is explicitely stated,
      (B) being true, does not make (A) true. (A) is still false.

  I have not seen a variation which explains the change of state (A) from false to true.
  Simply making (B) true does not make (A) true, but (A) must be true for anyone to die.

  If (A) were always true, then they would be dead already.
```

If anyone cares to dispute this. Please feel free to change the code at
line 20 to be logical and make a pull request. I do not think it is possible.

#Solution
While doing this experiment, one thing I learned is that global variables
are perfect analogs to common knowledge. So I decided to look at the other
globals I had declared, and see if there was any way to adjust the story
to use something else that could have a logical state transition.
"numDead" seemed to fit the best. We can make this secret knowledge that becomes public
quite easily.

So here's how we fix the puzzle.

1. Remove the oracle/visitor entirely.

2. Make it so everyone only saw everyone else's eyes once and they are now separated.

3. Have the new information be the institution of a memorial that broadcast the names of everyone who has died along with their eye color in real time.

Once the common knowledge from the memorial service is introduced, it becomes possible to deduce one's eye color by waiting and everyone does so simultaneously.

This changes the result so that every color group dies Cn days after the memorial service starts.

Everyone who is not a particular color would wait Cn + 1 and narrowly avoid suicide when the news comes out that Cn have committed suicide.

But they won't stay so lucky. ; )
