# Imagen base de Bun
FROM oven/bun:1

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias primero para aprovechar la cache
COPY package.json bun.lock ./

# Instalar dependencias
RUN bun install

# Copiar el resto del código
COPY . .

# Exponer el puerto del backend-appointments
EXPOSE 3005

# Comando de arranque
CMD ["bun", "run", "start"]
