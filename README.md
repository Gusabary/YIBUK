# YIBUK

## Repo introduction

In this repo is the course project of Web development, 2019 Spring semester. Its requirement is to develop an application which can behave just like an online bookstore.

And it is my first full-stack project.

### Current version

v1.0

### Function description

At present stage, you cannot reach my application from Internet since I haven't deployed it.

+ #### visit, sign up, sign in, log out

Entering from local, you can view a list of books and their detailed information with the identity of visitors. 

If you want to add some books to shopping cart or do purchasing, you need to sign in first. 

In case that you are a newcomer, the sign up button is just beside the sign in one. To sign up, username, passwords and email are required but don't worry, we won't really verify the email you just typed in. 

After signing in, you can log out at almost any time.

+ #### add to cart, purchase

Now you can view book list as a customer, that means you can see two buttons, 'add to cart' and 'purchase', if a book panel is expanded. Click 'add to cart' button, you can choose the quantity of that book to put in cart. 

Click the other one, you can also choose the quantity to buy, but note that storage of the book to be bought is limited. By the way, you have infinite money, at least in current version.

+ #### play with cart

At the sub header, you can see three buttons. They are 'Statistics', 'Orders' and 'Cart'. The cart button will bring you to your shopping cart, where lie books you selected to put here. 

To purchase, you can expand a book panel to buy the certain one. Also, at the top left exist two buttons, clicking the right one 'Buy' will take you to shopping mode, where you can click a book panel header to buy it, instead of expanding it. That is to say, you can buy more than one kind of book at a time. 

Return to the left one of the top left buttons and it is 'Delete'. Obviously, you can drop books from your cart after entering deleting mode with the same mechanism.

+ #### view statistics and orders

Beside the cart button in the sub header, there are statistics and order ones. At statistics page, you can see how many books of each kind you have purchased exactly during a certain time span.

At orders page, you can see each order you have made, including orderId, bookId, purchases and payment time.

+ #### sort, filter

On many occasions, there are two powerful functions, sort and filter. You can use them to get books you want, confirm a certain order quickly and screen out statistics during a certain period.

+ #### manage books, ban/unban customers

If you are an administrator (probably not), you can manage books in the online store, such as adding a book, updating a book and deleting a book.

Also, a list of customer information can chosen to be shown, with which you can ban or unban someone just by toggling a switch. 

### Features to be realized

+ can sort and filter in manage and cart pages
+ display a dialog to confirm when making a purchase
+ keep former cover as default when editing
+ fix the footer at the bottom of page really
+ further beautification

## API Spec.

See [here](./API-Spec.md).

## History version

### v1.0

release

## Something trivial

Given that the project name *e-book* is too straight forward, (Actually I don't think an online bookstore has to sell e-books. That means print ones are also available there. Anyway.) I got a name that is a little bit more interesting, *YIBUK*, which means *Youthful Imagination Brings U Knowledge*. Although the sentence looks a little farfetched and strange, it is after all better than *e-book*, maybe.

I created this repo at Feb. 27th, almost a month and 100 commits ago. From developing the project, I actually learned a lot and now I feel excited and delighted, indeed.

Well, welcome to raise an issue ~

## License

MIT

##### Last-modified date: 2019.3.30, 9 p.m.