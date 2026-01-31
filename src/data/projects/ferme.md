---
title: "Ferme"
category: "Website"
description: "Demo e-commerce website"
date: "2021-04"
featured: "true"
tags: ["django", "oracle-db", "bootstrap"]
image: "@assets/projects/ferme/preview.webp"
---

## Description

Demo e-commerce website made with Django, Bootstrap 5 and Oracle SQL (student project).

## Features

Products page with filters and search, product details page and cart button.

![Products page](../../assets/projects/ferme/products.png)

## Dev environment setup

### Prerequisites:

Python 3+, Docker/Podman and dependencies listed in requirements.txt

### Organization

The DB scripts are located in the /scripts_oracle directory.
The project uses the Django MVT pattern.

### Setup

1. Clone

```sh
git clone https://github.com/jaycem-dev/ferme-website.git
cd ferme-website
```

2. Create Python virtual environment and install dependencies

```sh
python3 -m venv venv
source venv/bin/activate
python -m pip install -r requirements.txt
```

3. Setup Oracle SQL Free container (Docker/Podman)

We'll use Oracle Database 23ai Free Lite. Read more [here](https://container-registry.oracle.com/ords/ocr/ba/database/free).

```sh
podman run -d --name oracle-db -p 1521:1521 container-registry.oracle.com/database/free:23.6.0.0-lite
```

4. Check container status

```sh
podman ps
```

5. Change DB password

```sh
podman exec <oracle-db> ./setPassword.sh <your_password>
```

6. Copy /scripts_oracle to the container:

```sh
podman cp scripts_oracle/ oracle-db:/tmp/scripts_oracle

```

7. Connect with sqlplus

```sh
podman exec -it oracle-db sqlplus sys/admin@freepdb1 as sysdba
```

8. Create user and assign permissions.

For local development, we can assign all permissions for quick start.

```sql
CREATE USER ferme IDENTIFIED BY password;
GRANT ALL PRIVILEGES TO ferme;
```

9. Run the scripts in sqlplus

```sql
@/tmp/scripts_oracle/1.SCRIPT_CREACION_TABLAS.ddl
@/tmp/scripts_oracle/2.SCRIPT_INSERTS.sql
@/tmp/scripts_oracle/3.TRIGGERS_AND_SP.sql
@/tmp/scripts_oracle/4.INSERT_PRODUCTOS_MUESTRA.sql
```

10. Update credentials in **ferme/settings.py** with the new user.

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.oracle",
        "NAME": "localhost:1521/freepdb1", # freepdb1 is the default pluggable db name in the oracle container
        "USER": "ferme",
        "PASSWORD": "password",
    }
}
```

11. Create migrations and superuser

```sh
python manage.py migrate
python manage.py createsuperuser
```

12. Run the server

```sh
python manage.py runserver
```

## Links

- [GitHub](https://github.com/jaycem-dev/ferme-website)
