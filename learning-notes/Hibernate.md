+ 用 Generate Persistence Mapping 自动生成实体层代码后，要将 @Table 注解中的 schema 属性删掉。
+ 用 Generate Persistence Mapping 自动生成实体层代码，需要有 `hibernate.cfg.xml` 文件中的 `<session-factory>` 。
+ Hibernate 实体类和数据库中设置一处 ID 自增即可。
+ primary key 不止一个属性时，需要对其序列化。（Generate Persistence Mapping 会自动生成）
+ 使用 CrudRepository 层中自定义的 delete 方法时，需要加上注解 `@Transactional` 。
+ 对于 java.util.Optional 类的对象，可以通过 `.get()` 方法获取其中的值。

##### Last-modified date: 2019.4.23, 6 p.m.

