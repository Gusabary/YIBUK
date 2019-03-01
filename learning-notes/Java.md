+ >+ 局部变量没有默认值，所以局部变量被声明后，必须经过初始化，才可以使用。
  >+ 实例变量具有默认值。数值型变量的默认值是0，布尔型变量的默认值是false，引用类型变量的默认值是null。

+ >Java中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。Java支持4种不同的访问权限。
  >
  >默认的，也称为default，在同一包内可见，不使用任何修饰符。
  >
  >私有的，以private修饰符指定，在同一类内可见。
  >
  >共有的，以public修饰符指定，对所有类可见。
  >
  >受保护的，以protected修饰符指定，对同一包内的类和所有子类可见。

+ >为了实现一些其他的功能，Java也提供了许多非访问修饰符。
  >
  >static修饰符，用来创建类方法和类变量。
  >
  >final修饰符，用来修饰类、方法和变量，final修饰的类不能够被继承，修饰的方法不能被继承类重新定义，修饰的变量为常量，是不可修改的。
  >
  >abstract修饰符，用来创建抽象类和抽象方法。
  >
  >synchronized和volatile修饰符，主要用于线程的编程。

+ >String类是不可改变的，所以你一旦创建了String对象，那它的值就无法改变了。 如果需要对字符串做很多修改，那么应该选择使用 StringBuffer & StringBuilder 类。


##### Last-modified date: 2019.2.27, 7 p.m.