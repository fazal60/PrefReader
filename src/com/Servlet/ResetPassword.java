package com.Servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;
import java.util.Random;

import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


/**
 * Servlet implementation class ResetPassword
 * @author Abhishek
 */
@WebServlet("/ResetPassword")
public class ResetPassword extends HttpServlet {
       
    /**
	 * 
	 */
	private static final long serialVersionUID = 504667177247448885L;

	
	private String message;
	 public void init() throws ServletException
	  {
	      // Do required initialization
	      message = "Hello World";
	  }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		 // Set response content type
	      response.setContentType("text/html");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		PrintWriter out = response.getWriter();
		
		 HttpSession session=request.getSession(true);
		  // Set response content type
	      response.setContentType("text/html");
	      
	   // Set to expire far in the past.
	      response.setHeader("Expires", "Sat, 6 May 1995 12:00:00 GMT");

	      // Set standard HTTP/1.1 no-cache headers.
	      response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

	      // Set IE extended HTTP/1.1 no-cache headers (use addHeader).
	      response.addHeader("Cache-Control", "post-check=0, pre-check=0");

	      // Set standard HTTP/1.0 no-cache header.
	      response.setHeader("Pragma", "no-cache");
		
		System.out.println("-------- MySQL JDBC Connection Testing ------------");
	      
	  	try {
	  		Class.forName("com.mysql.jdbc.Driver");
	  	} catch (ClassNotFoundException e) {
	  		System.out.println("Where is your MySQL JDBC Driver?");
	  		e.printStackTrace();
	  		return;
	  	}
	  
	  	
	  	System.out.println("MySQL JDBC Driver Registered!");
	  	Connection connection = null;
	    try {
	  		connection = DriverManager
	  		.getConnection("jdbc:mysql://localhost/nreader","news", "123456");
	   
	  	} catch (SQLException e) {
	  		System.out.println("Connection Failed! Check output console");
	  		e.printStackTrace();
	  		return;
	  	}
	   
	  	if (connection != null) {
	  		System.out.println("You made it, take control your database now!");
	  		
	  	} else {
	  		System.out.println("Failed to make connection!");
	  		return;
	  	}
	  	//get the user name
		String name=request.getParameter("resetusername");

		try {

		System.out.println("Reset Password:"+name);	
		String usermail;
		if(!name.contains("@")){
			/**********find email id***************/
				String findid="select mail from users where username='"+name+"'";
				Statement fid=connection.createStatement();
				ResultSet rid=fid.executeQuery(findid);
				rid.next();
				usermail=rid.getString("mail");
		}else{
			usermail=name;
		}
		/*******************************************/
		
		int key=11235813;
		Random val=new Random();
		int token=key^val.nextInt(1000000000);
	 
	      // Sender's email ID needs to be mentioned
	      String from = "prefreader@gmail.com";
	      //host
	      String host = "smtp.gmail.com";

	      Properties properties = new Properties();
	      properties.put("mail.smtp.auth", "true");
	      properties.put("mail.smtp.starttls.enable", "true");
	      properties.put("mail.smtp.host", host);
	      properties.put("mail.smtp.port", "587");
	 
	      // Get the Session object.
	      Session session1 = Session.getInstance(properties,
	      new javax.mail.Authenticator() {
	         protected PasswordAuthentication getPasswordAuthentication() {
	            return new PasswordAuthentication("prefreader", "prefreadermail");
	         }
	      });
	      
	      // Create a default MimeMessage object.
	         MimeMessage message = new MimeMessage(session1);
	         // Set From: header field of the header.
	         message.setFrom(new InternetAddress(from));
	         // Set To: header field of the header.
	         message.addRecipient(Message.RecipientType.TO,
	                                  new InternetAddress(usermail));
	         // Set Subject: header field
	         message.setSubject("PrefReader Reset Password Token");
	         // Now set the actual message
	         message.setText("Token :"+token+"\n Use this token to reset Password. Note this Token remains valid for 30 mins\n");
	         // Send message
	         Transport.send(message);
	         
	         System.out.println("Reset Password: mail sent");
	         //set token as attribute
	         session.setAttribute("token", token);
	         
	         out.print("sent");
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}catch (MessagingException mex) {
	         mex.printStackTrace();
	      }
		
		try {
			connection.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}

