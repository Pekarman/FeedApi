﻿// <auto-generated />
using System;
using Common.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Common.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Common.EntityFramework.Models.Asset", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("DealId")
                        .HasColumnName("dealid")
                        .HasColumnType("integer");

                    b.Property<byte[]>("ImageData")
                        .HasColumnName("imagedata")
                        .HasColumnType("bytea");

                    b.Property<string>("ImageName")
                        .HasColumnName("imagename")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("DealId");

                    b.ToTable("assets");
                });

            modelBuilder.Entity("Common.EntityFramework.Models.Bet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<decimal>("CurrentBet")
                        .HasColumnName("currentbet")
                        .HasColumnType("numeric");

                    b.Property<int>("DealId")
                        .HasColumnName("dealid")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("TimeStamp")
                        .HasColumnName("timestamp")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("UserId")
                        .HasColumnName("userid")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DealId");

                    b.ToTable("bets");
                });

            modelBuilder.Entity("Common.EntityFramework.Models.Deal", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<bool?>("CanBuyNow")
                        .HasColumnName("canbuynow")
                        .HasColumnType("boolean");

                    b.Property<int?>("CategoryId")
                        .HasColumnName("categoryid")
                        .HasColumnType("integer");

                    b.Property<DateTime>("EndTime")
                        .HasColumnName("endtime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool?>("IsChecked")
                        .HasColumnName("ischecked")
                        .HasColumnType("boolean");

                    b.Property<string>("LongDesc")
                        .HasColumnName("longdesc")
                        .HasColumnType("text");

                    b.Property<string>("PartNumber")
                        .HasColumnName("partnumber")
                        .HasColumnType("text");

                    b.Property<string>("ProductName")
                        .HasColumnName("productname")
                        .HasColumnType("text");

                    b.Property<double?>("Quantity")
                        .HasColumnName("quantity")
                        .HasColumnType("double precision");

                    b.Property<string>("ShortDesc")
                        .HasColumnName("shortdesc")
                        .HasColumnType("text");

                    b.Property<DateTime>("StartTime")
                        .HasColumnName("starttime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("StatusId")
                        .HasColumnName("statusid")
                        .HasColumnType("integer");

                    b.Property<int?>("SubcategoryId")
                        .HasColumnName("subcategoryid")
                        .HasColumnType("integer");

                    b.Property<string>("UoM")
                        .HasColumnName("uom")
                        .HasColumnType("text");

                    b.Property<int?>("UserId")
                        .HasColumnName("userid")
                        .HasColumnType("integer");

                    b.Property<double?>("pricebuynow")
                        .HasColumnName("pricebuynow")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("deals");
                });

            modelBuilder.Entity("Common.EntityFramework.Models.PassData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("PassHash")
                        .HasColumnName("passhash")
                        .HasColumnType("text");

                    b.Property<string>("SecretPhraseHash")
                        .HasColumnName("secretphrasehash")
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnName("userid")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("passdata");
                });

            modelBuilder.Entity("Common.EntityFramework.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<double?>("Balance")
                        .HasColumnName("balance")
                        .HasColumnType("double precision");

                    b.Property<string>("BankAccount")
                        .HasColumnName("bankaccount")
                        .HasColumnType("text");

                    b.Property<string>("BankCode")
                        .HasColumnName("bankcode")
                        .HasColumnType("text");

                    b.Property<string>("CompanyName")
                        .HasColumnName("companyname")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnName("email")
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnName("firstname")
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnName("isactive")
                        .HasColumnType("boolean");

                    b.Property<string>("LastName")
                        .HasColumnName("lastname")
                        .HasColumnType("text");

                    b.Property<string>("Locale")
                        .HasColumnName("locale")
                        .HasColumnType("text");

                    b.Property<string>("PassportNumber")
                        .HasColumnName("passportnumber")
                        .HasColumnType("text");

                    b.Property<string>("PayerRegNumber")
                        .HasColumnName("payerregnumber")
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .HasColumnName("phone")
                        .HasColumnType("text");

                    b.Property<int>("UserTypeId")
                        .HasColumnName("usertypeid")
                        .HasColumnType("integer");

                    b.Property<string>("Username")
                        .HasColumnName("username")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserTypeId");

                    b.ToTable("users");
                });

            modelBuilder.Entity("Common.EntityFramework.Models.UserSession", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("LastChangeTimeStamp")
                        .HasColumnName("lastchangetimestamp")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Locale")
                        .HasColumnName("locale")
                        .HasColumnType("text");

                    b.Property<DateTime>("LoginTimeStamp")
                        .HasColumnName("logintimestamp")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("UserId")
                        .HasColumnName("userid")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("usersession");
                });

            modelBuilder.Entity("Common.EntityFramework.Models.UserType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("TypeName")
                        .HasColumnName("typename")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("usertype");
                });

            modelBuilder.Entity("Common.EntityFramework.Models.Asset", b =>
                {
                    b.HasOne("Common.EntityFramework.Models.Deal", null)
                        .WithMany("Assets")
                        .HasForeignKey("DealId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Common.EntityFramework.Models.Bet", b =>
                {
                    b.HasOne("Common.EntityFramework.Models.Deal", null)
                        .WithMany("Bets")
                        .HasForeignKey("DealId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Common.EntityFramework.Models.Deal", b =>
                {
                    b.HasOne("Common.EntityFramework.Models.User", null)
                        .WithMany("Deals")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Common.EntityFramework.Models.User", b =>
                {
                    b.HasOne("Common.EntityFramework.Models.UserType", "UserType")
                        .WithMany()
                        .HasForeignKey("UserTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Common.EntityFramework.Models.UserSession", b =>
                {
                    b.HasOne("Common.EntityFramework.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}