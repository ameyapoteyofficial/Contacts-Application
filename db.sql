--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
    address_id bigint NOT NULL,
    contact_id bigint NOT NULL,
    address_type text NOT NULL,
    address text,
    city text,
    state text,
    zip text
);


ALTER TABLE public.address OWNER TO postgres;

--
-- Name: address_address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.address_address_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_address_id_seq OWNER TO postgres;

--
-- Name: address_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.address_address_id_seq OWNED BY public.address.address_id;


--
-- Name: contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact (
    contact_id bigint NOT NULL,
    fname text NOT NULL,
    mname text,
    lname text
);


ALTER TABLE public.contact OWNER TO postgres;

--
-- Name: contact_contact_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_contact_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_contact_id_seq OWNER TO postgres;

--
-- Name: contact_contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_contact_id_seq OWNED BY public.contact.contact_id;


--
-- Name: date; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.date (
    date_id bigint NOT NULL,
    contact_id bigint NOT NULL,
    date_type text NOT NULL,
    date date
);


ALTER TABLE public.date OWNER TO postgres;

--
-- Name: date_date_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.date_date_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.date_date_id_seq OWNER TO postgres;

--
-- Name: date_date_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.date_date_id_seq OWNED BY public.date.date_id;


--
-- Name: phone; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phone (
    phone_id bigint NOT NULL,
    contact_id bigint NOT NULL,
    phone_type text NOT NULL,
    area_code text,
    number text
);


ALTER TABLE public.phone OWNER TO postgres;

--
-- Name: phone_phone_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.phone_phone_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.phone_phone_id_seq OWNER TO postgres;

--
-- Name: phone_phone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.phone_phone_id_seq OWNED BY public.phone.phone_id;


--
-- Name: address address_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address ALTER COLUMN address_id SET DEFAULT nextval('public.address_address_id_seq'::regclass);


--
-- Name: contact contact_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact ALTER COLUMN contact_id SET DEFAULT nextval('public.contact_contact_id_seq'::regclass);


--
-- Name: date date_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.date ALTER COLUMN date_id SET DEFAULT nextval('public.date_date_id_seq'::regclass);


--
-- Name: phone phone_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phone ALTER COLUMN phone_id SET DEFAULT nextval('public.phone_phone_id_seq'::regclass);


--
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (contact_id, address_type);


--
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (contact_id);


--
-- Name: date date_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.date
    ADD CONSTRAINT date_pkey PRIMARY KEY (contact_id, date_type);


--
-- Name: phone phone_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phone
    ADD CONSTRAINT phone_pkey PRIMARY KEY (contact_id, phone_type);


--
-- Name: address fk_address; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT fk_address FOREIGN KEY (contact_id) REFERENCES public.contact(contact_id) NOT VALID;


--
-- Name: date fk_date; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.date
    ADD CONSTRAINT fk_date FOREIGN KEY (contact_id) REFERENCES public.contact(contact_id);


--
-- Name: phone fk_phone; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phone
    ADD CONSTRAINT fk_phone FOREIGN KEY (contact_id) REFERENCES public.contact(contact_id);


--
-- PostgreSQL database dump complete
--

