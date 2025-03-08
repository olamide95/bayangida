<motion.section
initial={{ opacity: 0, y: 50 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
viewport={{ once: true }}
className={styles.teamSection}
>
<div className={styles.teamContainer}>
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.8 }}
    className={styles.teamTitle}
  >
    Meet Our Team
  </motion.h2>
  <div className={styles.teamGrid}>
    {teamMembers.map((member, index) => (
      <motion.div
        key={member.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2, duration: 0.8 }}
        className={styles.teamMemberCard}
      >
        <img src={member.image} alt={member.name} className={styles.teamMemberImage} />
        <h3 className={styles.teamMemberName}>{member.name}</h3>
        <p className={styles.teamMemberDesignation}>{member.designation}</p>
      </motion.div>
    ))}
  </div>
</div>
</motion.section>
