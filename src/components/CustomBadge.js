import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2
    },
    customBadge: {
        backgroundColor: props => props.color,
        color: "white"
    }
});

function CustomBadge(props) {
    const { classes, text, count } = props;
    return (
        <div>
            <Badge
                classes={{ badge: classes.customBadge }}
                className={classes.margin}
                badgeContent={count}
            >
                {text}
            </Badge>
        </div>
    );
}

CustomBadge.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomBadge);