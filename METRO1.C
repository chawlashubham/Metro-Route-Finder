
#include<stdio.h>
#include<conio.h>
#include<dos.h>
#include<process.h>
#include<alloc.h>
#include<string.h>
#include<graphics.h>
int p,inum,fnum;
typedef struct station
{
char name[25];
int num;
struct station *next;
struct station *prev;
struct station *ynext;
struct station *yprev;
struct station *rnext;
struct station *rprev;
}station;
station  *t,*temp,*temp1,*start,*cur,*rc,*kg,*cal,*cat,*temp2,*temp3,*temp4,*temp5,*start1,*cur1,*cur2;
typedef struct line
{
char a[10];
station* stat1;
station* stat2;
struct line *lnext;
int c;
}l;
l * blue,* yellow,* red;
typedef struct queue
{
char q[25];
int no;
struct queue *qnext;
}queue;
queue *rear=NULL,*front=NULL;
void menu1();
void menu2();
void map();
void map1();
void map2();
void map3();
void map4();
void map5();
void insert();
void delqueue();
void path();
void logo();

station* blue2();
station* red2();
station* blue1();
station* yellow2();
//station* yellow1();
//station* red1():

void fare()
{
   int diff;
   float fare;

   diff=inum-fnum;
   if(diff<0)
    diff*=(-1);
   fare=diff*3;
   if(fare>50)
     fare/=2.5;
   if(fare>40 && fare<50)
     fare-=20;


   printf("\n\nTHE FARE FOR THIS ROUTE IS = %.2f",fare);
   printf("\n\n\n\n\n\n\nPRESS ANY KEY TO GO TO MAIN MENU.");

}

void main()
{
 /* request auto detection */
int gdriver = DETECT, gmode, errorcode;

/* initialize graphics mode */
initgraph(&gdriver, &gmode, "C:/TURBOC3/BGI");

menu1();
menu2();
getch();
closegraph();
}




void menu1()
{
char b,c;
 // setbkcolor(8);
setcolor(15);
line(0,250,270,190);
line(0,300,480,500);
line(285,410,500,500);
line(382,220,450,345);
line(420,420,560,480);
line(400,420,540,480);
line(456,425,260,400);
line(255,390,260,400);
line(220,380,255,390);
line(220,380,215,390);
line(189,209,310,270);
line(310,270,408,270);
line(25,265,160,250);
line(25,280,160,300);
line(70,260,70,286);
line(95,258,95,290);
line(120,256,120,293);
line(160,250,180,273);
line(180,273,160,300);
line(35,264,35,280);
line(38,263,38,282);
//line(57,262,57,285);
setfillstyle(1,8);
floodfill(73,280,getcolor());
floodfill(122,285,getcolor());
//floodfill(59,285,getcolor());
//floodfill(59,282,getcolor());


arc(289,337,50,98,149);
arc(395,390,-30,-310,71);
arc(480,420,114,176,150);
arc(480,420,114,176,120);
setfillstyle(1,8);
floodfill(400,320,15);
setfillstyle(1,7);
floodfill(330,280,15);
setfillstyle(1,7);
floodfill(400,410,15);
setfillstyle(2,7);
floodfill(270,195,getcolor());


  settextstyle(1,0,4);
  outtextxy(35,15,"WELCOME TO");
  settextstyle(1,0,6);
  outtextxy(150,60,"METRO");
  outtextxy(350,60,"STATION");
  outtextxy(420,140,"SERVICE");
  settextstyle(1,0,4);
k: while(!kbhit())
  {
   setcolor(15);
    settextstyle(1,0,2);
  outtextxy(30,430,"PRESS ENTER TO CONTINUE");
  delay(300);
  setcolor(0);
  outtextxy(30,430,"PRESS ENTER TO CONTINUE");
  delay(300);

  }
  b=getch();
  sound(600);
  delay(200);
  nosound();

  if(b!=13)
  goto k;
  }


void menu2()
  {
   int x=13,b;

  p:
  cleardevice();
//  setbkcolor(8);
  settextstyle(1,0,6);
  setcolor(15);
  outtextxy(70,30,"SERVICES AVAILABLE");
  outtextxy(170,265,"PATH VIEW");
  outtextxy(170,165,"MAP VIEW");
  outtextxy(170,365,"EXIT");
   if(x==13)
   {
      rectangle(165,170,450,220);
     }
   else if(x==19)
   {
    rectangle(165,275,450,320);
    }
   else if(x==25)
   {
    rectangle(165,375,450,420);
    }

  gotoxy(15,x);printf(">>");
  gotoxy(65,x);printf("<<");
   b=getch();
  if(kbhit())
 {
    if(x==13)
    {
     b=getch();
      sound(2100);
      delay(200);
      nosound();
	if(b==80)
	{
	  x=19;
	  goto p;
	 }

	if(b==72)
       {
	 x=25;
	 goto p;
       }
     }

    if(x==19)
    {  b=getch();
	sound(2100);
      delay(200);
      nosound();
       if(b==80)
       {
	x=25;
	goto p;
	}
       if(b==72)
       {
	 x=13;
	 goto p;
       }
    }

    if(x==25)
      {
      b=getch();
	sound(2100);
      delay(200);
      nosound();
	if(b==80)
	  {
	  x=13;
	  goto p;
	  }
	if(b==72)
	  {
	  x=19;
	  goto p;
	  }
      }
   }

  if(b==13)
    {
      sound(600);
      delay(200);
      nosound();
      switch(x)
      {
	     case 13:map();
		    break;
	     case 19:path();
		     break;
	     case 25:
		      logo();
		      getch();
		      exit(0);
		    break;


      }
   }
 }

void map()
{
   int  y=5,z,m;
    z:
   cleardevice();
 //  setbkcolor(8);
   setcolor(15);
   settextstyle(1,0,5);
   outtextxy(170,50,"RED LINE");
   outtextxy(170,110,"BLUE LINE");
   outtextxy(170,170,"GREEN LINE");
   outtextxy(170,230,"VIOLET LINE");
   outtextxy(170,290,"YELLOW LINE");
   outtextxy(170,350,"MAIN MENU");
   if(y==5)
       { setcolor(RED);
       outtextxy(170,50,"RED LINE");
	 rectangle(160,55,440,100);
	}
   else if(y==9)
       { setcolor(BLUE);
	outtextxy(170,110,"BLUE LINE");
	rectangle(160,115,440,160);
       }
   else if(y==13)
       {
	setcolor(GREEN);
	outtextxy(170,170,"GREEN LINE");
	rectangle(160,175,440,220);
       }
   else if(y==17)
       {
       setcolor(1);
       outtextxy(170,230,"VIOLET LINE");
       rectangle(160,235,440,280);
       }
   else if(y==21)
       {
       setcolor(YELLOW);
	outtextxy(170,290,"YELLOW LINE");
       rectangle(160,295,440,340);
       }
   else if(y==25)
       {
       rectangle(160,355,440,400);
       }
   gotoxy(10,y);printf(">>");
   gotoxy(65,y);printf("<<");


    m=getch();
    if(kbhit())
    {
      if(y==5)
      {
	      m=getch();
	      sound(2100);
	      delay(200);
	      nosound();
	      if(m==80)
	      {
			y=9;
			goto z;
	      }
	      if(m==72)
	     {
			y=25;
			goto z;
	     }
       }
     if(y==9)
     {
	     m=getch();
	     sound(2100);
	     delay(200);
	     nosound();
	     if(m==80)
	     {          y=13;
			goto z;
	     }
	     if(m==72)
	     {
		       y=5;
		       goto z;
	     }
    }
    if(y==13)
    {
	     m=getch();
	     sound(2100);
	     delay(200);
	     nosound();
	     if(m==80)
	     {        y=17;
		      goto z;
	     }
	     if(m==72)
	     {        y=9;
		      goto z;
	     }
    }
     if(y==17)
    {
	     m=getch();
	     sound(2100);
	     delay(200);
	     nosound();
	     if(m==80)
	     {        y=21;
		      goto z;
	     }
	     if(m==72)
	     {        y=13;
		      goto z;
	     }
    }
     if(y==21)
    {
	     m=getch();
	     sound(2100);
	     delay(200);
	     nosound();
	     if(m==80)
	     {        y=25;
		      goto z;
	     }
	     if(m==72)
	     {        y=17;
		      goto z;
	     }
    }
     if(y==25)
    {
	     m=getch();
	     sound(2100);
	     delay(200);
	     nosound();
	     if(m==80)
	     {        y=5;
		      goto z;
	     }
	     if(m==72)
	     {        y=21;
		      goto z;
	     }
    }
    }

     if(m==13)
     {
      sound(600);
      delay(200);
      nosound();
      switch(y)
      {
       case 5:map3();
	       goto z;
	       break;
       case 9:map4();
	      goto z;
	       break;
       case 13:map5();
	      goto z;
	     break;
       case 17:map4();
	      goto z;
	     break;
       case 21:map2();
	      goto z;
	     break;
       case 25: menu2();
	       break;
      }
     }
}



void map3()
{
cleardevice();
settextstyle(DEFAULT_FONT,0,1);
setfillstyle(SOLID_FILL,RED);
setcolor(RED);
line(10,30,320,400);
line(320,400,600,20);
outtextxy(10,30," Rithala");
fillellipse(10,30,4,4);
outtextxy(36,60," Rohini West");
fillellipse(36,60,4,4);
outtextxy(62,90," Rohini East");
fillellipse(62,90,4,4);
outtextxy(88,120," Pitampura");
fillellipse(84,120,4,4);
outtextxy(114,150," Kohat Enclave");
fillellipse(109,150,4,4);
outtextxy(140,180," Netaji subash Place");
fillellipse(135,180,4,4);
outtextxy(166,210," Keshav Puram");
fillellipse(160,210,4,4);
outtextxy(192,240," Kanahiya Nagar");
fillellipse(185,240,4,4);
outtextxy(218,270," Inderlok");
fillellipse(212,270,4,4);
circle(212,270,6);
outtextxy(244,300," Shastri Nagar");
fillellipse(236,300,4,4);
outtextxy(270,330," Pratap Nagar");
fillellipse(261,330,4,4);
outtextxy(348,362," Pulbangash");
fillellipse(348,362,4,4);
outtextxy(374,324," Tis Hazari");
fillellipse(374,324,4,4);
outtextxy(405,286," Kashmere Gate");
fillellipse(402,286,4,4);
circle(402,286,6);
outtextxy(428,248," Shastri Park");
fillellipse(433,248,4,4);
outtextxy(456,210," Seelampur");
fillellipse(461,210,4,4);
outtextxy(484,172," Welcome");
fillellipse(488,172,4,4);
outtextxy(512,134," Shahdara");
fillellipse(516,134,4,4);
outtextxy(540,96," Mansarovar Park");
fillellipse(545,96,4,4);
outtextxy(568,58," Jhilmil");
fillellipse(573,58,4,4);
outtextxy(470,20," Dilshad Garden");
fillellipse(600,20,4,4);
getch();
}


void map2()
{
cleardevice();
settextstyle(DEFAULT_FONT,0,1);
setfillstyle(SOLID_FILL,14);
setcolor(YELLOW);
line(30,450,30,420);
line(30,420,200,420);
line(200,420,350,380);
line(350,380,400,100);
line(400,100,300,70);
line(300,70,250,20);
outtextxy(1,450,"Huda");
outtextxy(1,460,"City");
outtextxy(1,470,"Centre");
fillellipse(30,450,2,2);
outtextxy(1,400,"IFFCO");
outtextxy(1,410,"Chowk");
fillellipse(30,420,2,2);
outtextxy(50,430," MG");
outtextxy(50,440,"Road");
fillellipse(66,420,2,2);
outtextxy(50,405,"  Sikandarpur");
fillellipse(102,420,2,2);
outtextxy(120,430,"  Guru");
outtextxy(110,440,"Dronacharya");
fillellipse(147,420,2,2);
outtextxy(190,430," Arjangarh");
fillellipse(200,420,2,2);
outtextxy(155,405," Ghitorni");
fillellipse(230,413,2,2);
outtextxy(248,413," Sultanpur");
fillellipse(255,406,2,2);
outtextxy(200,390," Chhatarpur");
fillellipse(280,399,2,2);
outtextxy(307,393," Qutab Minar");
fillellipse(306,393,2,2);
outtextxy(300,374," Saket");
fillellipse(350,380,2,2);
outtextxy(358,362," Malviya nagar");
fillellipse(353,366,2,2);
outtextxy(205,344," Hauz Khas Enclave");
fillellipse(356,348,2,2);
outtextxy(358,330," Green Park");
fillellipse(359,332,2,2);
outtextxy(312,312," AIIMS");
fillellipse(362,316,2,2);
outtextxy(363,300," INA");
fillellipse(365,300,2,2);
outtextxy(292,281," Jor Bagh");
fillellipse(368,284,2,2);
outtextxy(370,268," Race Course");
fillellipse(371,268,2,2);
outtextxy(254,252," Udhyog Bhawan");
fillellipse(374,252,2,2);
outtextxy(378,228," Central Secretariate");
fillellipse(377,228,2,2);
circle(377,228,4);
outtextxy(283,201," Patel Chowk");
fillellipse(381,204,2,2);
outtextxy(385,188," Rajiv Chowk");
fillellipse(384,188,2,2);
circle(384,188,4);
outtextxy(301,170," New Delhi");
fillellipse(387,172,2,2);
circle(387,172,4);
outtextxy(391,154," Chawri Bazar");
fillellipse(390,156,2,2);
outtextxy(270,138," Chandni Chowk");
fillellipse(393,140,2,2);
outtextxy(395,123," Kashmere Gate");
fillellipse(395,124,2,2);
circle(395,124,4);
outtextxy(401,99," Civil Lines");
fillellipse(400,100,2,2);
outtextxy(371,83," Vidhan Sabha");
fillellipse(375,92,2,2);
outtextxy(215,84," Vishwavidyalaya");
fillellipse(350,84,2,2);
outtextxy(325,70," GTB Nagar");
fillellipse(325,76,2,2);
outtextxy(205,69," Model Town");
fillellipse(300,70,2,2);
outtextxy(288,53," Azadpur");
fillellipse(287,57,2,2);
outtextxy(160,42," Adarsh Nagar");
fillellipse(274,44,2,2);
outtextxy(251,16," Jahangirpuri");
fillellipse(250,20,2,2);
getch();
}


void map4()
{
cleardevice();
settextstyle(DEFAULT_FONT,0,1);
setfillstyle(SOLID_FILL,1);
setcolor(1);
line(80,100,100,140);
line(100,140,100,175);
line(100,175,550,400);
outtextxy(80,100," Central Secretariat");
fillellipse(80,100,4,4);
circle(80,100,6);
outtextxy(1,137," Khan Market");
fillellipse(100,140,4,4);
outtextxy(100,170," JL Nehru Stadium");
fillellipse(100,175,4,4);
outtextxy(55,190," Jangpura");
fillellipse(134,192,4,4);
outtextxy(168,202," Lajpat Nagar");
fillellipse(168,209,4,4);
outtextxy(113,225," Moolchand");
fillellipse(202,226,4,4);
outtextxy(236,236," Kailash Colony");
fillellipse(236,243,4,4);
outtextxy(167,260," Nehru place");
fillellipse(270,260,4,4);
outtextxy(304,272," Kalkaji Mandir");
fillellipse(304,277,4,4);
outtextxy(235,295," Govind Puri");
fillellipse(338,294,4,4);
outtextxy(372,306," Okhla");
fillellipse(372,311,4,4);
outtextxy(285,328," Jasola Apollo");
fillellipse(406,328,4,4);
outtextxy(440,340," Sarita Vihar");
fillellipse(440,345,4,4);
outtextxy(360,362," Mohan Estate");
fillellipse(474,361,4,4);
outtextxy(508,374," Tukhlakabad");
fillellipse(508,379,4,4);
outtextxy(470,400," Badarpur");
fillellipse(550,400,4,4);
getch();
}
void map5()
{
cleardevice();
settextstyle(DEFAULT_FONT,0,1);
setcolor(GREEN);
line(10,30,154,310);
line(154,310,450,400);
setfillstyle(SOLID_FILL,GREEN);
outtextxy(10,30," Mundka");
fillellipse(10,30,4,4);
outtextxy(28,65," Rajdhani Park");
fillellipse(28,65,4,4);
outtextxy(46,100," Nangol Railway Station");
fillellipse(46,100,4,4);
outtextxy(64,135," Nangloi");
fillellipse(64,135,4,4);
outtextxy(82,170," Surajmal Stadium");
fillellipse(82,170,4,4);
outtextxy(100,205," Udyog Nagar");
fillellipse(100,205,4,4);
outtextxy(118,240," Preeagarhi");
fillellipse(118,240,4,4);
outtextxy(136,271," Paschim Vihar West");
fillellipse(136,275,4,4);
outtextxy(1,307," Paschim Vihar East");
fillellipse(154,310,4,4);
outtextxy(195,317," Madipur");
fillellipse(196,323,4,4);
outtextxy(128,337," Shivaji Park");
fillellipse(238,336,4,4);
outtextxy(280,340," Punjabi Bagh");
fillellipse(280,349,4,4);
outtextxy(188,360," Ashok Park Main");
fillellipse(322,362,4,4);
circle(322,362,6);
outtextxy(408,380," Satguru Ram Singh Marg");
fillellipse(408,387,4,4);
outtextxy(450,400," kirti Nagar");
fillellipse(450,400,4,4);
circle(450,400,6);
getch();
}


void path()
{
  int e,n;
  FILE *fp,*fp1,*fp2;
  int i=0,j=0,k=0,f=0;
  cleardevice();
  fp=fopen("blueline.c","w");
  fprintf(fp, "Shadipur RajendraPlace KarolBagh Jhandewalan Ramakrishna ");
  fprintf(fp,"Rajivchowk BaraKhamba MandiHouse PragatiMaidan Indraprastha ");
  fprintf(fp,"Yamunabank Laxminagar Preetvihar Karkarduma Kaushambhi vaishali");
 fclose(fp);

   blue=(l*)malloc(sizeof(l));
   strcpy(blue->a,"BLUE");
   fp=fopen("blueline.c","r");
   fscanf(fp,"%s",blue->stat1->name);
   temp=(station *)malloc(sizeof(station));
   strcpy(temp->name,blue->stat1->name);
   blue->stat1=temp;
   ++i;
   temp->num=1;
   temp->next=NULL;
   temp->prev=NULL;
   temp->ynext=NULL;
   temp->yprev=NULL;
   temp->rnext=NULL;
   temp->rprev=NULL;
   start=temp;
   cur=temp;
     while(!feof(fp))
       {
	  temp1=(station *)malloc(sizeof(station));
	  fscanf(fp,"%s",temp1->name);
	  ++i;
	  temp1->num=i;
	  temp1->next=NULL;
	  temp1->prev=NULL;
	  temp1->ynext=NULL;
	  temp1->yprev=NULL;
	  temp1->rnext=NULL;
	  temp1->rprev=NULL;
	  cur->next=temp1;
	  temp1->prev=cur;
	  cur=temp1;
	     if(strcmp("Rajivchowk",temp1->name)==0)
	      {
		  rc=temp1;
	      }
	  if(i==16)
		 {
		  blue->stat2=temp1;
		  blue->c=i;
		  break;
		  }
       }
 fclose(fp);
//display blue
  temp=start;
   while(temp!=NULL)
      {
	// printf("%d: %s	",temp->num,temp->name);
	 temp=temp->next;
       }


//create yellow
 fp1=fopen("yellowline.c","w");
 fprintf(fp1, "civilline kashmirigate chandnichowk chawribazar ");
 fprintf(fp1,"newdelhi rajivchowk patelchowk centralsecretariat udhyogbhavan");
 fclose(fp1);
 yellow=(l*)malloc(sizeof(l));
 blue->lnext=yellow;
 yellow->lnext=NULL;
 strcpy(yellow->a,"YELLOW");
 fp1=fopen("yellowline.c","r");
 fscanf(fp1,"%s",yellow->stat1->name);
 temp2=(station *)malloc(sizeof(station));
 strcpy(temp2->name,yellow->stat1->name);
 yellow->stat1=temp2;
 i++;
 temp2->num=i;
 temp2->next=NULL;
 temp2->prev=NULL;
 temp2->ynext=NULL;
 temp2->yprev=NULL;
 temp2->rnext=NULL;
 temp2->rprev=NULL;
 start1=temp2;
 cur1=temp2;
   while(!feof(fp1))
     {
       temp3=(station *)malloc(sizeof(station));
       fscanf(fp1,"%s",temp3->name);
       i++;
       temp3->num=i;
       temp3->next=NULL;
       temp3->prev=NULL;
       temp3->ynext=NULL;
       temp3->yprev=NULL;
       temp3->rnext=NULL;
       temp3->rprev=NULL;
	   if(strcmp("kashmirigate",temp3->name)==0)
	     {
		  kg=temp3;
	     }
	   if(strcmp("rajivchowk",temp3->name)==0)
	     {
		  cur1->ynext=rc;
		  rc->yprev=cur1;
		  cur1=rc;
	      }
	   if( strcmp("rajivchowk",temp3->name) !=0)
	      {
		  cur1->ynext=temp3;
		  temp3->yprev=cur1;
		  cur1=temp3;
	       }
	   if(i==25)
	      {
		   yellow->stat2=temp3;
		   yellow->c=9;
		   break;
	       }
	 }
    fclose(fp1);


//display yellow
  temp2=start1;
  while(temp2!=NULL)
     {
	// printf("%d: %s	",temp2->num,temp2->name);
	 temp2=temp2->ynext;
      }


//red creation
    fp2=fopen("redline.c","w");
    fprintf(fp2, "inderlok shastrinagar pratapnagar pulbangash ");
    fprintf(fp2,"tishazari kashmirigate shastripark seelampur ");
    fprintf(fp2,"shahdara mansarovarpark jhilmil dilshadgarden ");
    fclose(fp2);
    red=(l*)malloc(sizeof(l));
    blue->lnext=yellow;
    yellow->lnext=red;
    red->lnext=NULL;
    strcpy(red->a,"RED");
    fp2=fopen("redline.c","r");
    fscanf(fp2,"%s",red->stat1->name);
    temp4=(station *)malloc(sizeof(station ));
    strcpy(temp4->name,red->stat1->name);
    red->stat1=temp4;
    i++;
    temp4->num=i;
    temp4->next=NULL;
    temp4->prev=NULL;
    temp4->ynext=NULL;
    temp4->yprev=NULL;
    temp4->rnext=NULL;
    temp4->rprev=NULL;
    start=temp4;
    cur2=temp4;
	 while(!feof(fp2))
	    {
	       temp5=(station *)malloc(sizeof(station));
	       fscanf(fp2,"%s",temp5->name);
	       i++;
	       temp5->num=i;
	       temp5->next=NULL;
	       temp5->prev=NULL;
	       temp5->ynext=NULL;
	       temp5->yprev=NULL;
	       temp5->rnext=NULL;
	       temp5->rprev=NULL;
		 if(strcmp("kashmirigate",temp5->name)==0)
		   {
		     kg->rprev=cur2;
		     cur2->rnext=kg;
		     cur2=kg;
		   }
		  if(strcmp("kashmirigate",temp5->name)!=0)
		   {
		     cur2->rnext=temp5;
		     temp5->rprev=cur2;
		     cur2=temp5;
		    }

		  if(i==37)
		   {
		    red->stat2=temp5;
		    red->c=12;
		    break;
		    }
	      }
fclose(fp2);


//display red
   temp4=start;
   while(temp4!=NULL)
       {
	 // printf("%d: %s	",temp4->num,temp4->name);
	  temp4=temp4->rnext;
       }
//   printf("%s   %s  %s   %s   %s  %s	",blue->stat1->name,blue->stat2->name,red->stat1->name,red->stat2->name,yellow->stat1->name,yellow->stat2->name);
//call func via keyboard
  e:
   gotoxy(15,5);
   cleardevice();
   printf("\nENTER LINE SOURCE \n1.BLUE\n2.YELLOW\n3.RED \n");
   scanf( "\n%d",&j);
      if(j==1)
	{
	     cal=blue1();
	     printf("%s->",cal->name);
	}
       if(j==2)
	{
	      cal=yellow2(); printf("%s->",cal->name);
	}
     if(j==3)
	{
	      cal=red2();printf("%s->",cal->name);
	}
	      printf("\n\n\nENTER LINE DESTINATION  \n1.BLUE\n2.YELLOW\n3.RED \n");
	      scanf("\n%d",&k);
		if(k==1)
			{
			   cat=blue2();printf("%s->",cat->name);
			}
		if(k==2)
			{
			   cat=yellow2();printf("%s->",cat->name);
			}
	       if(k==3)
			{
			   cat=red2();printf("%s->",cat->name);
			}
	       if(j==1&&k==1)
		   {
			   temp=cal;
			   if(cat->num>16 || cat->num <1)
			  {
			   printf("WRONG ENTRY");
			   goto e;
			   }
			   else
			 {
			   insert(temp->name,temp->num);
			     if(cat->num>cal->num)
				{
				  temp=temp->next;
				  while(temp->num!=cat->num)
				      {
					insert(temp->name,temp->num);
					temp=temp->next;
				       }
				 }
			     else
				{
				     temp=temp->prev;
				     while(temp->num!=cat->num)
				       {
					 insert(temp->name,temp->num);
					 temp=temp->prev;
				       }
				}
			 insert(cat->name,cat->num);
			 cleardevice();
			   gotoxy(15,5);
			   printf("\n\nTHE ROUTE IS AS FOLLOWS:   ");
			  while(front!=NULL)
			  {
			  delqueue();
			  }
			  fare();
			 // printf("%d",n);
			  getch();
			  menu2();
		       }


		}//blueif ends
	if(j==2 &&k==2)
	       {
		  temp=cal;
		  if(cat->num>25 || (cat->num <17 &&cat->num!=6)||cat->num==22)
		      {
		       printf("WRONG ENTRY");
		       goto e;
		       }
		  else
		       {
				 insert(temp->name,temp->num);
			    if((cat->num==6&&cal->num<=21)|| cat->num>cal->num)
				{
				   temp=temp->ynext;
				   while(temp->num!=cat->num)
				   {
				      insert(temp->name,temp->num);
				      temp=temp->ynext;
				    }
				 }
			   if((cal->num==6&&cat->num<=21) || cat->num<cal->num)
				{
				    temp=temp->yprev;
				      while(temp->num!=cat->num)
				       {
					 insert(temp->name,temp->num);
					 temp=temp->yprev;
				       }
				}
			   insert(cat->name,cat->num);
			   cleardevice();
			   gotoxy(15,5);
			    printf("\n\nTHE ROUTE IS AS FOLLOWS:   ");
			   while(front!=NULL)
			   {
			    delqueue();
			   }
			  fare();
			  // printf("%d",n);
			   getch();
			   menu2();
		       }
	    }

     if(j==3&&k==3)
	   {
		temp=cal;
		  if(cat->num>37 || (cat->num <26 &&cat->num!=18)||cat->num==31)
		    {
		    printf("WRONG ENTRY");
		    goto e;
		    }
		  else
		   {
		       insert(temp->name,temp->num);
		       if((cat->num==18&&cal->num<=30)|| cat->num>cal->num)
			   {
			      temp=temp->rnext;
			      while(temp->num!=cat->num)
				 {
				   insert(temp->name,temp->num);
				   temp=temp->rnext;
				 }
			   }
		      if((cal->num==18&&cat->num<=30) || cat->num<cal->num)
			   {
			      temp=temp->rprev;
			      while(temp->num!=cat->num)
				{
				   insert(temp->name,temp->num);
				   temp=temp->rprev;
				}
			   }
		     insert(cat->name,cat->num);
		     cleardevice();
		     gotoxy(15,5);
		      printf("\n\nTHE ROUTE IS AS FOLLOWS:   ");
		    while(front!=NULL)
		    {
		     delqueue();
		    }
		    fare();
		   // printf("%d",n);
		    getch();
		    menu2();
		}
	}

   if(j==1&&k==2)
       {
	       temp=cal;
	       insert(temp->name,temp->num);
	       if((cat->num<17&&cat->num!=6)||cat->num>25||(cat->num==22))
		  {
		   printf("WRONG ENTRY");
		   goto e;
		   }
	       else
		 {
		   if(temp->num<6)
		     {
		       temp=temp->next;
		       while(temp->num!=6)
			 {
			    insert(temp->name,temp->num);
			    temp=temp->next;
			 }
		     }
		    else
			{
			   temp=temp->prev;
			   while(temp->num!=6)
				{
				 insert(temp->name,temp->num);
				 temp=temp->prev;
				}
			}
		   insert(rc->name,rc->num);
		    if(cat->num>=23)
		     {
			 temp=rc->ynext;
			 while(temp->num!=cat->num)
			   {
			      insert(temp->name,temp->num);
			      temp=temp->ynext;
			   }
		      }
		  else
		      {
			    temp=rc->yprev;
			    while(temp->num!=cat->num)
			      {
				insert(temp->name,temp->num);
				temp=temp->yprev;
			      }
		      }
		    insert(cat->name,cat->num);
		    cleardevice();
		    gotoxy(15,5);
		     printf("\n\nTHE ROUTE IS AS FOLLOWS:   ");
		    while(front!=NULL)
		    {
		     delqueue();
		    }
		    fare();
		   // printf("%d",n);
		    getch();
		    menu2();
		}
	}

   if(j==1&&k==3)
	{
	  temp=cal;
	  insert(temp->name,temp->num);
	  if((cat->num<26&&cat->num!=18)||cat->num>37||(cat->num==31))
	     {
	     printf("WRONG ENTRY");
	     goto e;
	     }
	  else
	      {
		  if(temp->num<6)
		    {
		      temp=temp->next;
		       while(temp->num!=6)
			   {
			     insert(temp->name,temp->num);
			     temp=temp->next;
			    }
		    }
		  else
		    {
		     temp=temp->prev;
		       while(temp->num!=6)
			  {
			     insert(temp->name,temp->num);
			     temp=temp->prev;
			  }
		    }
			    insert(rc->name,rc->num);
			    temp=rc->yprev;
			     while(temp->num!=18)
			       {
				 insert(temp->name,temp->num);
				 temp=temp->yprev;
			       }
		      insert(kg->name,kg->num);
		      if((cat->num>=32&&temp->num==18))
			   {
			      temp=kg->rnext;
			      while(temp->num!=cat->num)
				 {
				    insert(temp->name,temp->num);
				    temp=temp->rnext;
				 }
			   }
		      if((temp->num==18&& cat->num<=30) )
			  {
			     temp=kg->rprev;
			     while(temp->num!=cat->num)
			       {
				 insert(temp->name,temp->num);
				 temp=temp->rprev;
			       }
			  }
			 insert(cat->name,cat->num);
			 cleardevice();
			 gotoxy(15,5);
			  printf("\n\nTHE ROUTE IS AS FOLLOWS:   ");
			 while(front!=NULL)
			 {
			    delqueue();
			  }
			  fare();
			 // printf("%d",n);
			  getch();
			  menu2();
		}//else ends
	 }//if ends
   if(j==2&&k==3)
       {
	  if(cat->num<26&&cat->num!=18||cat->num>37)
	   {
	    printf("WRONG ENTRY");
	    goto e;
	    }
	  else
	    {
	      temp=cal;
	       if(temp!=kg)
		 insert(temp->name,temp->num);
	       if(cal->num<18)
		  {
		    temp=temp->ynext;
		     while(temp->num!=18)
		       {
			  insert(temp->name,temp->num);
			  temp=temp->ynext;
		       }
		  }
	       if(temp->num>18)
		 {
		      temp=temp->yprev;
		      while(temp->num!=18)
		       {
			    insert(temp->name,temp->num);
			    temp=temp->yprev;
			}
		  }
	       insert(kg->name,kg->num);
	     if(cat->num>=32)
	       {
		    temp=kg->rnext;
		    while(temp->num!=cat->num)
		     {
		       insert(temp->name,temp->num);
		       temp=temp->rnext;
		     }
	       }
	    if(cat->num<=30)
	      {
	       temp=kg->rprev;
	       while(temp->num!=cat->num)
		   {
		       insert(temp->name,temp->num);
		       temp=temp->rprev;
		   }
	       }
	    insert(cat->name,cat->num);
	    cleardevice();
	     gotoxy(15,5);
	     printf("\n\nTHE ROUTE IS AS FOLLOWS:   ");
	    while(front!=NULL)
	    {
	      delqueue();
	    }
	    fare();
	   // printf("%d",n);
	    getch();
	    menu2();
	 }
   }
   if(j==2&&k==1)
      {
	  if(cat->num<1||cat->num>16)
	    {
	     printf("WRONG ENTRY");
	     goto e;
	    }
	  else
	    {
	      temp=cal;
		if(temp!=rc)
		  insert(temp->name,temp->num);
		if(cal->num<=21)
		     {
		       temp=temp->ynext;
		       while(temp->num!=6)
			{
			  insert(temp->name,temp->num);
			  temp=temp->ynext;
			}
		      }
		if(temp->num>=23)
		    {
		      temp=temp->yprev;
		      while(temp->num!=6)
			  {
			     insert(temp->name,temp->num);
			     temp=temp->yprev;
			  }
		     }
		 insert(rc->name,rc->num);
	       if(cat->num>6)
		  {
		    temp=rc->next;
		    while(temp->num!=cat->num)
		      {
			insert(temp->name,temp->num);
			temp=temp->next;
		       }
		  }
	      if(cat->num<6)
		 {
		  temp=temp->prev;
		  while(temp->num!=cat->num)
		      {
			insert(temp->name,temp->num);
			temp=temp->prev;
		      }
		  }
		insert(cat->name,cat->num);
		cleardevice();
		gotoxy(15,5);
		 printf("\n\nTHE ROUTE IS AS FOLLOWS:   ");
		while(front!=NULL)
		{
		 delqueue();
		}
		fare();
	       //	printf("%d",n);
		getch();
		menu2();
	    }//else

    }//if

 if(j==3&&k==2)
  {
      temp=cal;
      if(temp!=kg)
      insert(temp->name,temp->num);
      if(temp->num>=32)
	 {
	    temp=temp->rprev;
	    while(temp->num!=18)
	     {
	       insert(temp->name,temp->num);
	       temp=temp->rprev;
	     }

	 }
     if(temp->num<=30)
       {
	  temp=temp->rnext;
	  while(temp->num!=18)
	   {
	      insert(temp->name,temp->num);
	      temp=temp->rnext;
	   }

       }
      insert(kg->name,kg->num);
    if(cat->num>18||cat->num==6)
      {
	 temp=kg->ynext;
	 while(temp->num!=cat->num)
	    {
	     insert(temp->name,temp->num);
	     temp=temp->ynext;
	    }

      }
    if(cat->num<18)
     {
	temp=kg->yprev;
	while(temp->num!=cat->num)
	   {
	     insert(temp->name,temp->num);
	     temp=temp->yprev;
	   }

     }
       insert(cat->name,cat->num);
       cleardevice();
	 gotoxy(15,5);
	 printf("\n\nTHE ROUTE IS AS FOLLOWS:   ");
       while(front!=NULL)
       {
	delqueue();
       }
       fare();
     //  printf("%d",n);
       getch();
       menu2();
  }//if ends

 if(j==3&&k==1)
  {
     temp=cal;
     if(temp!=kg)
     insert(temp->name,temp->num);
     if(temp->num>=32)
      {
	temp=temp->rprev;
	while(temp->num!=18)
	 {
	    insert(temp->name,temp->num);
	    temp=temp->rprev;
	 }

      }
     if(temp->num<=30)
      {
	temp=temp->rnext;
	while(temp->num!=18)
	   {
	      insert(temp->name,temp->num);
	      temp=temp->rnext;
	   }

      }
	 insert(kg->name,kg->num);
	 temp=kg->ynext;
	 while(temp->num!=6)
	   {
	     insert(temp->name,temp->num);
	     temp=temp->ynext;
	   }
	  insert(rc->name,rc->num);
      if(cat->num>6)
      {
	temp=rc->next;
	while(temp->num!=cat->num)
	 {
	   insert(temp->name,temp->num);
	   temp=temp->next;
	 }
       }
     if(cat->num<6)
      {
       temp=temp->prev;
       while(temp->num!=cat->num)
	{
	    insert(temp->name,temp->num);
	    temp=temp->prev;
	}
      }
       insert(cat->name,cat->num);
       cleardevice();
	gotoxy(15,5);
	printf("\n\nTHE ROUTE IS AS FOLLOWS:   ");
       while(front!=NULL)
       {
	 delqueue();
       }
       fare();
      // printf("%d",n);
       getch();
       menu2();
   }

 getch();
}



void insert(char a[],int n)
 {
   queue *ptr;
   ptr=(queue *)malloc(sizeof(queue));
   ptr->no=n;
   strcpy(ptr->q,a);
     if(rear==NULL)
       {
	 rear=ptr;
	 front=ptr;
	 rear->qnext=NULL;
	 front->qnext=NULL;
       }
      else
      {
	 rear->qnext=ptr;
	 rear=ptr;
	 rear->qnext=NULL;
      }
  }


void delqueue()
{
    queue * ptr;
      if(front==NULL)
	{
	 printf("UNDERFLOW");
	}
      else
	{
	  ptr=front;
	  printf("  %d: %s -> ",ptr->no,ptr->q);
	  front=front->qnext;
	  free(ptr);
	}

}


station * blue2()
{
station *temp,*temp1;int ch,flag=-1;
temp=blue->stat1;
while(temp!=NULL)
{
printf("%d : %s	",temp->num,temp->name);
temp=temp->next;
}
printf("\n\nENTER YOUR CHOICE NUM: ");
scanf("%d",&ch);
inum=ch;
temp1=blue->stat1;
while(temp1!=NULL)
{
if(ch==temp1->num)
{
flag=1;
return temp1;
break;
}
else
temp1=temp1->next;
}
if(flag==-1)
{printf("WRONG INPUT");
return NULL; }
}


station * red2()
{
     station *temp, *temp1;int ch,flag=-1;
     temp=red->stat1;
       while(temp!=NULL)
	{
	 printf("%d: %s	",temp->num,temp->name);
	 temp=temp->rnext;
	}
     printf("\n\nENTER YOUR CHOICE NUM:");
     scanf("%d",&ch);
     inum=ch;
     temp1=red->stat1;
       while(temp1!=NULL)
	{
	 if(ch==temp1->num)
	   {
	      flag=1;
	      return temp1;
	      break;
	   }
	else
	{
	temp1=temp1->rnext;
	}
     }
  if(flag==-1)
   {
     printf("WRONG INPUT");
     return NULL;
   }
}



station * yellow2()
{
   station  *temp,*temp1;int ch,flag=-1;
   temp=yellow->stat1;
     while(temp!=NULL)
       {
	 printf("%d: %s	",temp->num,temp->name);
	 temp=temp->ynext;
	}
  printf("\n\nENTER YOUR CHOICE NUM:");
  scanf("%d",&ch);
  inum=ch;
  temp1=yellow->stat1;
    while(temp1!=NULL)
  {
     if(ch==temp1->num)
      {
       flag=1;
       return temp1;
       break;
      }
     else
     {
      temp1=temp1->ynext;
     }
  }
  if(flag==-1)
   {
     printf("WRONG INPUT");
     return NULL;
   }
}



//displays the name and return pointer to the source
station * blue1( )
{
    station  *temp,*temp1;int ch, i=1,flag=-1;FILE *fp;char c[15];
    fp=fopen("blueline.c","r");
    while(!feof(fp))
     {
	 fscanf(fp,"%s",c);
	 printf("%d : %s \t",i,c);
	 i++;
     }
fclose(fp);
   printf("\n\nSELECT YOUR SOURCE  FROM ABOVE STATIONS-ENTER NO.");
   scanf("%d",&ch);
   fnum=ch;
   temp=blue->stat1;
       while(temp!=NULL)
      {
	if(temp->num==ch)
	  {
	   temp1=temp;
	   flag =1;
	   return temp1;
	   break;
	  }
       else
	 {
	 temp=temp->next;
	 }
     }
    if(flag==-1)
       {
	 printf("WRONG INPUT");
	 return NULL;
       }
 }



station *  red1( )
{

      station  *temp,*temp1;int ch, i=26,flag=-1;FILE *fp;char c[15];
      fp=fopen("redline.c","r");
	 while(!feof(fp))
	 {
	     fscanf(fp,"%s",c);
	     printf("%d: %s \t",i,c);
	     i++;
	  }
      fclose(fp);
       printf("\n\nSELECT YOUR SOURCE  FROM ABOVE STATIONS-ENTER NO.");
       scanf("%d",&ch);
       fnum=ch;
       temp=red->stat1;
	while(temp!=NULL)
	   {
	      if(temp->num==ch)
	       {
		 temp1=temp;
		 flag =1;
		 return temp1;
		 break;
	       }
	      else
	      {
	       temp=temp->rnext;
	      }
	  }
     if(flag==-1)
      {
       printf("WRONG INPUT");
      return NULL;
      }
}


station *  yellow1()
{
    station  *temp,*temp1;int ch, i=17,flag=-1;FILE *fp;char c[15];
    fp=fopen("yellowline.c","r");
     while(!feof(fp))
       {
	  fscanf(fp,"%s",c);
	  printf("%d: %s \t",i,c);
	  i++;
       }
fclose(fp);
      printf("\n\nSELECT YOUR SOURCE  FROM ABOVE STATIONS-ENTER NO.");
      scanf("%d",&ch);
      fnum=ch;
      temp=yellow->stat1;
	while(temp!=NULL)
	  {
	    if(temp->num==ch)
	      {
		temp1=temp;
		flag =1;
		return temp1;
		break;
	       }
	    else
	      {
		temp=temp->next;
	      }
	 }
    if(flag==-1)
    {
     printf("WRONG INPUT");
     return NULL;
    }
}








void logo()
{
    int gd=DETECT,gm;
    initgraph(&gd,&gm,"");
    settextstyle(4,0,8);
     outtextxy(50,100," Developers ");
    settextstyle(6,0,3);
    outtextxy(50,250,"Meghna Chabbra");
    outtextxy(50,290,"Rhythm Narang");
    outtextxy(50,330,"Garima Tyagi");
    outtextxy(50,370,"Shubham Chawla");
    outtextxy(250,250,"-     14103246");
    outtextxy(250,290,"-     14103256");
    outtextxy(250,330,"-     14103257");
    outtextxy(250,370,"-     14103255");

    getch();
    closegraph();
    exit(0);


}